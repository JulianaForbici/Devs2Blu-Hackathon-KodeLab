package br.com.blumenau.backend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // libera o front em dev
public class HealthController {

    @GetMapping("/health")
    public String health() {
        return "OK - Blumenau Inclusiva API";
    }
}