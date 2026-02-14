---
layout: page
title: Archives
language: fr
permalink: /fr/archive
---

{% assign translations = site.data.translations %}
{% assign siteposts = site.posts | where: 'language', page.language %}

{% for post in siteposts %}
- **{% include localized-date.html date=post.date language=page.language %}** — [{{ post.title }}]({{ post.url | prepend: site.baseurl }}){% if post.external_url %} <span class="icon icon-external-link"></span>{% endif %}
{% endfor %}
