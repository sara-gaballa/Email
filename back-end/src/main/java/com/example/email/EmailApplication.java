package com.example.email;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class EmailApplication {

    public static void main(String[] args) {
        //SpringApplication.run(EmailApplication.class, args);
        SpringApplicationBuilder builder = new SpringApplicationBuilder(EmailApplication.class);

        builder.headless(false);

        ConfigurableApplicationContext context = builder.run(args);
    }

}
