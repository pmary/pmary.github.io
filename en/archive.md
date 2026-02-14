---
layout: page
title: Archive
language: en
permalink: /en/archive
---

{% assign translations = site.data.translations %}
{% assign siteposts = site.posts | where: 'language', page.language %}

{% for post in siteposts %}
- **{{ post.date | date: "%b %-d, %Y" }}** — [{{ post.title }}]({{ post.url | prepend: site.baseurl }}){% if post.external_url %} <span class="icon icon-external-link"></span>{% endif %}
{% endfor %}
