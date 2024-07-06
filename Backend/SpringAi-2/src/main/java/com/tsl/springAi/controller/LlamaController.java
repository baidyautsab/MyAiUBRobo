package com.tsl.springAi.controller;

import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/myAi")
public class LlamaController {
	private OllamaChatModel model;

	public LlamaController(OllamaChatModel model) {
		super();
		this.model = model;
	}
	
	@GetMapping("/prompt")
	private Flux<String> promptResponse(@RequestParam("prompt") String prompt) {
		return model.stream(prompt);
	}
}
