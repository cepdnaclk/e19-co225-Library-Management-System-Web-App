import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.sql.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

public class EmailScheduler {
    public static void main(String[] args) {
        try {
            Scheduler scheduler = StdSchedulerFactory.getDefaultScheduler();

            JobDetail job = JobBuilder.newJob(EmailJob.class)
                    .withIdentity("emailJob", "group")
                    .build();

            Trigger trigger = TriggerBuilder.newTrigger()
                    .withIdentity("emailTrigger", "group")
                    .withSchedule(CronScheduleBuilder.dailyAtHourAndMinute(0, 0))  // Run every day at midnight
                    .build();

            scheduler.scheduleJob(job, trigger);
            scheduler.start();
        } catch (SchedulerException e) {
            e.printStackTrace();
        }
    }

    public static class EmailJob implements Job {

        // Method to retrieve the list of users from the database or data source
        private List<User> getUserList() {
            List<User> userList = new ArrayList<>();

            // Example: Fetch users from a database
            Connection connection = null;
            Statement statement = null;
            ResultSet resultSet = null;

            try {
                // Create a database connection
                connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/library", "username", "password");

                // Execute a query to fetch users
                statement = connection.createStatement();
                resultSet = statement.executeQuery("SELECT * FROM users");

                // Iterate over the result set and create User objects
                while (resultSet.next()) {
                    String username = resultSet.getString("username");
                    String email = resultSet.getString("email");

                    User user = new User(username, email);
                    userList.add(user);
                }
            } catch (SQLException e) {
                e.printStackTrace();
            } finally {
                // Close the database resources
                if (resultSet != null) {
                    try {
                        resultSet.close();
                    } catch (SQLException e) {
                        e.printStackTrace();
                    }
                }
                if (statement != null) {
                    try {
                        statement.close();
                    } catch (SQLException e) {
                        e.printStackTrace();
                    }
                }
                if (connection != null) {
                    try {
                        connection.close();
                    } catch (SQLException e) {
                        e.printStackTrace();
                    }
                }
            }

            return userList;
        }

        @Override
        public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
            // Logic to calculate due dates and send reminder emails
            try {
                // Get the list of users and their books from your database or data source
                List<User> users = getUserList();

                // Iterate over each user
                for (User user : users) {
                    List<Book> borrowedBooks = user.getBorrowedBooks();

                    // Iterate over each book borrowed by the user
                    for (Book book : borrowedBooks) {
                        Date dueDate = book.getDueDate();
                        Date currentDate = new Date();

                        // Calculate the time difference between the current date and due date
                        long timeDifference = dueDate.getTime() - currentDate.getTime();
                        long daysDifference = TimeUnit.DAYS.convert(timeDifference, TimeUnit.MILLISECONDS);

                        // If the due date is tomorrow, send a reminder email
                        if (daysDifference == 1) {
                            sendReminderEmail(user.getEmail(), book.getTitle(), dueDate);
                        }
                    }
                }
            } catch (MessagingException e) {
                // Handle any exceptions or errors that occur during the process
                throw new JobExecutionException(e);
            }
        }

        private void sendReminderEmail(String recipientEmail, String bookTitle, Date dueDate) throws MessagingException {
            // Configure the email server properties
            Properties properties = new Properties();
            properties.put("mail.smtp.host", "your_smtp_host");
            properties.put("mail.smtp.port", "your_smtp_port");
            properties.put("mail.smtp.auth", "true");

            // Create a Session with authentication credentials
            Session session = Session.getInstance(properties, new Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication("your_email", "your_password");
                }
            });

            try {
                // Create a new email message
                Message message = new MimeMessage(session);
                message.setFrom(new InternetAddress("your_email"));
                message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipientEmail));
                message.setSubject("Library Book Due Date Reminder");
                message.setText("Dear User,\n\nThis is a reminder that the book \"" + bookTitle +
                        "\" is due tomorrow (" + dueDate.toString() + ").\n\nPlease return the book to the library.\n\nBest regards,\nThe Library Team");

                // Send the email
                Transport.send(message);
            } catch (MessagingException e) {
                // Handle any exceptions or errors that occur during the process
                throw e;
            }
        }
    }

    public static class User {
        private String username;
        private String email;
        private List<Book> borrowedBooks;

        public User(String username, String email) {
            this.username = username;
            this.email = email;
            this.borrowedBooks = new ArrayList<>();
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public List<Book> getBorrowedBooks() {
            return borrowedBooks;
        }

        public void setBorrowedBooks(List<Book> borrowedBooks) {
            this.borrowedBooks = borrowedBooks;
        }
    }

    public static class Book {
        private String title;
        private Date dueDate;

        public Book(String title, Date dueDate) {
            this.title = title;
            this.dueDate = dueDate;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public Date getDueDate() {
            return dueDate;
        }

        public void setDueDate(Date dueDate) {
            this.dueDate = dueDate;
        }
    }
}
