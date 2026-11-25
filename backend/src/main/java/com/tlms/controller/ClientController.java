package com.tlms.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.tlms.entity.Client;
import com.tlms.service.ClientService;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/clients")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    // GET ALL
    @GetMapping
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Client getClientById(@PathVariable Integer id) {
        return clientService.getClientById(id);
    }

    // CREATE
    @PostMapping
    public Client createClient(@RequestBody Client client) {
        return clientService.createClient(client);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Client updateClient(
            @PathVariable Integer id,
            @RequestBody Client client) {

        return clientService.updateClient(id, client);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteClient(@PathVariable Integer id) {

        clientService.deleteClient(id);

        return "Client deleted successfully";
    }
}