# i18n

## Translations

Text translations are stored as YAML files in the _data folder.  
Exemple:
```yaml
posts:
  en: Posts
  fr: Actualités
```

```markdown
{{ translations.posts[page.language] }}
```

## Multilingual pages

## Multilingual posts

# Conventions

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)