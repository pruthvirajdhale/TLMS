package com.tlms.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.tlms.entity.Document;
import com.tlms.service.DocumentService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping
    public List<Document> getAllDocuments() {
        return documentService.getAllDocuments();
    }

    @GetMapping("/{id}")
    public Document getDocumentById(@PathVariable Integer id) {
        return documentService.getDocumentById(id);
    }

    @PostMapping
    public Document createDocument(@RequestBody Document document) {
        return documentService.createDocument(document);
    }

    @PutMapping("/{id}")
    public Document updateDocument(
            @PathVariable Integer id,
            @RequestBody Document document) {

        return documentService.updateDocument(id, document);
    }

    @DeleteMapping("/{id}")
    public String deleteDocument(@PathVariable Integer id) {

        documentService.deleteDocument(id);

        return "Document deleted successfully";
    }
}