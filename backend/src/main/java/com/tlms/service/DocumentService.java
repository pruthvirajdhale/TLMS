package com.tlms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tlms.entity.Document;
import com.tlms.repository.DocumentRepository;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;

    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public Document createDocument(Document document) {
        return documentRepository.save(document);
    }

    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    public Document getDocumentById(Integer id) {
        return documentRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Document not found with ID: " + id));
    }

    public Document updateDocument(Integer id, Document document) {

        Document existing = getDocumentById(id);

        existing.setCaseId(document.getCaseId());
        existing.setUploadedBy(document.getUploadedBy());
        existing.setDocumentName(document.getDocumentName());
        existing.setDocumentType(document.getDocumentType());
        existing.setFileName(document.getFileName());
        existing.setFilePath(document.getFilePath());
        existing.setFileSize(document.getFileSize());
        existing.setRemarks(document.getRemarks());

        return documentRepository.save(existing);
    }

    public void deleteDocument(Integer id) {

        Document existing = getDocumentById(id);

        documentRepository.delete(existing);
    }
}