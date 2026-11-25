package com.tlms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tlms.entity.Client;
import com.tlms.repository.ClientRepository;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    // CREATE
    public Client createClient(Client client) {
        return clientRepository.save(client);
    }

    // GET ALL
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    // GET BY ID
    public Client getClientById(Integer id) {

        return clientRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Client not found with ID: " + id));
    }

    // UPDATE
    public Client updateClient(Integer id, Client client) {

        Client existingClient = getClientById(id);

        existingClient.setClientCode(client.getClientCode());
        existingClient.setClientName(client.getClientName());
        existingClient.setCompanyName(client.getCompanyName());
        existingClient.setPanNumber(client.getPanNumber());
        existingClient.setGstin(client.getGstin());
        existingClient.setEmail(client.getEmail());
        existingClient.setMobile(client.getMobile());
        existingClient.setAddress(client.getAddress());
        existingClient.setCity(client.getCity());
        existingClient.setState(client.getState());
        existingClient.setPincode(client.getPincode());
        existingClient.setStatus(client.getStatus());

        return clientRepository.save(existingClient);
    }

    // DELETE
    public void deleteClient(Integer id) {

        Client existingClient = getClientById(id);

        clientRepository.delete(existingClient);
    }
}