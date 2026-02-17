package com.codecollab.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    private final SecretKey signingKey;
    private final long accessTokenExpiry;
    private final long refreshTokenExpiry;

    public JwtService(
            @Value("${app.jwt.secret}") String secret,
            @Value("${app.jwt.access-token-expiry}") long accessTokenExpiry,
            @Value("${app.jwt.refresh-token-expiry}") long refreshTokenExpiry) {
        this.signingKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessTokenExpiry = accessTokenExpiry;
        this.refreshTokenExpiry = refreshTokenExpiry;
    }

    /**
     * Generates an access token (short-lived) with user claims.
     * Contains: sub=userId, email, displayName, type=ACCESS
     */
    public String generateAccessToken(String userId, String email, String displayName) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", email);
        claims.put("displayName", displayName);
        claims.put("type", "ACCESS");

        return Jwts.builder()
                .claims(claims)
                .subject(userId)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + accessTokenExpiry))
                .signWith(signingKey, Jwts.SIG.HS256)
                .compact();
    }

    /**
     * Generates a refresh token (long-lived) with minimal claims.
     * Contains: sub=userId, type=REFRESH
     */
    public String generateRefreshToken(String userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("type", "REFRESH");

        return Jwts.builder()
                .claims(claims)
                .subject(userId)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + refreshTokenExpiry))
                .signWith(signingKey, Jwts.SIG.HS256)
                .compact();
    }

    /**
     * Validates the token and returns parsed claims.
     * Throws JwtException on invalid/expired tokens.
     */
    public Claims validateToken(String token) {
        return Jwts.parser()
                .verifyWith(signingKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Extracts the user ID (subject) from a valid token.
     */
    public String extractUserId(String token) {
        return validateToken(token).getSubject();
    }

    /**
     * Extracts the token type (ACCESS or REFRESH).
     */
    public String extractTokenType(String token) {
        return validateToken(token).get("type", String.class);
    }

    /**
     * Checks if a token is valid (not expired, correct signature).
     */
    public boolean isTokenValid(String token) {
        try {
            validateToken(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public long getAccessTokenExpiry() {
        return accessTokenExpiry;
    }
}
