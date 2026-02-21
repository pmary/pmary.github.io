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

# Draft Posts

Posts can be marked as drafts by adding `draft: true` to the front matter:

```yaml
---
title: "My Post"
draft: true
---
```

When a post is marked as draft:

- A **"DRAFT" banner** is displayed at the top of the post page
- A `<meta name="robots" content="noindex, nofollow">` tag is added to prevent search engine indexing
- The post is **excluded** from the sitemap, RSS feed, home page, and archive listings

To publish, simply remove `draft: true` from the front matter. The post will immediately appear in all listings and become indexable by search engines.

# Conventions

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)