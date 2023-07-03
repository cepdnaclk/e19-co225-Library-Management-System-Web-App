package com.e19.librarymanagement.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {
    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    LIBRARIAN_READ("librarian:read"),
    LIBRARIAN_UPDATE("librarian:update"),
    LIBRARIAN_CREATE("librarian:create"),
    LIBRARIAN_DELETE("librarian:delete"),
    MEMBER_READ("member:read"),
    MEMBER_UPDATE("member:update"),
    MEMBER_CREATE("member:create"),
    MEMBER_DELETE("member:delete");

    @Getter
    private final String permission;
}
