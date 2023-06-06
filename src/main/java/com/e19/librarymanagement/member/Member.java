package com.e19.librarymanagement.member;

import jakarta.persistence.*;
import lombok.*;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor(force = true)
@Entity
@Table
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private final Long id;
    @Column
    private final String firstName;
    @Column
    private final String lastName;
    private final String address;
    private final String email;
    private final String password;
    private final String birthDay;
    private final Integer contact;

    public Member(Long id, String firstName, String lastName, String address, String email, String password, String birthDay, Integer contact) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.email = email;
        this.password = password;
        this.birthDay = birthDay;
        this.contact = contact;
    }


    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getAddress() {
        return address;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getBirthDay() {
        return birthDay;
    }

    public Integer getContact() {
        return contact;
    }

    @Override
    public String toString() {
        return "Member{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", address='" + address + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", birthDay='" + birthDay + '\'' +
                ", contact=" + contact +
                '}';
    }
}
