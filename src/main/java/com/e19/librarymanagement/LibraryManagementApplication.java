package com.e19.librarymanagement;

import com.e19.librarymanagement.auth.AuthenticationService;
import com.e19.librarymanagement.auth.RegisterRequest;
import com.e19.librarymanagement.models.Book;
import com.e19.librarymanagement.service.BookService;
import com.github.javafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static com.e19.librarymanagement.models.Role.*;

@SpringBootApplication
public class LibraryManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(LibraryManagementApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(
			AuthenticationService service,
			BookService bookservice
	) {
		return args -> {
			userCreate(service, bookservice);
		};
	}

		private static void userCreate(AuthenticationService service, BookService bookService) {
			var admin = RegisterRequest.builder()
					.firstname("Admin")
					.lastname("Admin")
					.email("admin@mail.com")
					.password("password")
					.address("admin")
					.contact(10001)
					.birthday("no_birthday")
					.role(ADMIN)
					.build();
			System.out.println("Admin token: " + service.register(admin).getAccessToken());

			Faker faker = new Faker();

			for(int i=0; i<5; i++) {
				String firstname = faker.name().firstName();
				String lastname = faker.name().lastName();
				String email = String.format("%s.%s@gmail.com", firstname, lastname);
				String password = firstname;
				String address = faker.address().fullAddress();
				Integer contact = faker.number().numberBetween(100000, 1000000);

				RegisterRequest user = RegisterRequest.builder()
						.firstname(firstname)
						.lastname(lastname)
						.email(email)
						.password(password)
						.address(address)
						.contact(contact)
						.birthday("test_birthday")
						.role(MEMBER)
						.build();

				service.register(user);
			}

			for(int i=0; i<5; i++){
				String isbn = Integer.toString(faker.number().numberBetween(1000, 2344));
				String author = faker.book().author();
				String title = faker.book().title();
				Integer pub_year = faker.number().numberBetween(1990, 2023);

				Book book = Book.builder()
						.author(author)
						.ISBN(isbn)
						.pub_year(pub_year)
						.title(title)
						.build();

				bookService.addBook(book);
			}
		}
	}

