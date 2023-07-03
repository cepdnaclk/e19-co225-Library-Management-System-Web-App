package com.e19.librarymanagement.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.e19.librarymanagement.models.Permission.*;

@RequiredArgsConstructor
public enum Role {
    MEMBER(
            Set.of(
                    MEMBER_CREATE,
                    MEMBER_DELETE,
                    MEMBER_READ,
                    MEMBER_UPDATE
            )),
    ADMIN(
            Set.of(
                    ADMIN_READ,
                    ADMIN_UPDATE,
                    ADMIN_CREATE,
                    ADMIN_DELETE,
                    LIBRARIAN_READ,
                    LIBRARIAN_UPDATE,
                    LIBRARIAN_CREATE,
                    LIBRARIAN_DELETE,
                    MEMBER_CREATE,
                    MEMBER_DELETE,
                    MEMBER_READ,
                    MEMBER_UPDATE
            )),
    LIBRARIAN(
            Set.of(
                    LIBRARIAN_READ,
                    LIBRARIAN_UPDATE,
                    LIBRARIAN_CREATE,
                    LIBRARIAN_DELETE,
                    MEMBER_CREATE,
                    MEMBER_DELETE,
                    MEMBER_READ,
                    MEMBER_UPDATE
            ));

    @Getter
    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities(){
        var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());

        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}
