from transformers import AutoTokenizer, AutoModelForTokenClassification, pipeline

def anonymizeTranscription(text, ner_model="dbmdz/bert-large-cased-finetuned-conll03-english"):
    tokenizer = AutoTokenizer.from_pretrained(ner_model)
    model = AutoModelForTokenClassification.from_pretrained(ner_model)

    # Create a pipeline for NER
    ner_pipeline = pipeline("ner", model=model, tokenizer=tokenizer, aggregation_strategy="simple")

    # Run NER on the input text
    ner_results = ner_pipeline(text)

    # Create a mapping for entity replacements
    replacement_map = {
        "PER": "patient_name",
        "NUM": "phone_number",
        "EMAIL": "patient_email",
        "LOC": "location_name",
        "ADDR": "address_name",
        "MISC": "miscellaneous_entity"
    }

    # Replace entities in the text
    modified_text = text
    for entity in sorted(ner_results, key=lambda x: x['start'], reverse=True):
        label = entity["entity_group"]
        replacement = replacement_map.get(label, label.lower())
        modified_text = (
            modified_text[:entity["start"]]
            + replacement
            + modified_text[entity["end"]:]
        )

    return modified_text