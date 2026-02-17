package com.codecollab.security;

import com.codecollab.entity.User;
import com.codecollab.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

/**
 * JWT Authentication Filter — intercepts every request, validates the
 * Authorization: Bearer <token> header, and sets SecurityContext.
 *
 * This filter demonstrates understanding of:
 * 1. Token extraction from HTTP headers
 * 2. Stateless authentication (no server-side sessions)
 * 3. Spring Security filter chain integration
 * 4. Principal injection for downstream controllers
 */
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public JwtAuthFilter(JwtService jwtService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        // Skip if no Bearer token present
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7);

        try {
            // Validate token signature and expiry
            Claims claims = jwtService.validateToken(jwt);
            String userId = claims.getSubject();
            String tokenType = claims.get("type", String.class);

            // Only accept ACCESS tokens for API auth (not REFRESH tokens)
            if (!"ACCESS".equals(tokenType)) {
                filterChain.doFilter(request, response);
                return;
            }

            // Ensure SecurityContext is not already populated
            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                Optional<User> userOpt = userRepository.findById(userId);
                if (userOpt.isPresent()) {
                    User user = userOpt.get();

                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            user, // principal = User entity
                            null, // credentials (not needed)
                            List.of(new SimpleGrantedAuthority("ROLE_USER")));

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (JwtException | IllegalArgumentException e) {
            // Invalid token — continue without authentication
            // Spring Security will return 401 for protected endpoints
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        return path.startsWith("/api/auth/login")
                || path.startsWith("/api/auth/signup")
                || path.startsWith("/ws");
    }
}
