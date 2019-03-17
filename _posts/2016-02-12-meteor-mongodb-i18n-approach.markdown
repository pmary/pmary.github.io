---
layout: post
title:  "Approach to MongoDB internationalisation (i18n) with Meteor"
date:   2016-02-12 13:46:40
categories: meteor i18n
comments: true
---
In my Meteor application Mapker, I needed to create a publication that is capable of serving objects with strings in more than one language.
I could have used the popular Meteor package tap-i18n-db but I prefer avoid to add one more dependency and keep full control over my data architecture.

Let me present the problem with an example.

Assume that we have a Taxons collection and that we are going to have to support two languages, _English_ and _French_.

So one client will like to get the information in English:

```other
{
  _id: "nY3x9toeqhDoSbP9e",
  name: "Wood working"
}
```

And another client will like to get the information in French

```other
{
  _id: "nY3x9toeqhDoSbP9e",
  name: "Menuiserie"
}
```

The two main questions I’m interested in are:

1. How do I store the data in the db?\n2. How will I serve the data in the right language, keeping the reactivity?

Lets talk about both of them.

**Embed the multilingual data in a subdocument**

We assume that the base language is English. The document’s fields are in the base language and the translations for these fields are kept in a in a subdocument named i18n, example:

```other
{
  _id: "nY3x9toeqhDoSbP9e",
  name: "Wood working",
  i18n: {
    fr: {
      name: "Menuiserie"
    }
  }
}
```

On the client, the documents should not show the i18n sub-object. Instead, the fields have to be overridden by their translation in the current client’s language. It’s done by the publication, using the observeChanges() cursor method.

Example: If a client uses the `fr` language, the document from the previous section will appear on the client as:

```other
{
  _id: "nY3x9toeqhDoSbP9e",
  name: "Menuiserie"
}
```

**Server-side transform via a publication**

To achieve this goal, I used the **observeChange()** collection method. This way, every published documents will be formatted accordingly to the user language, server-side and reactively.

> _Assuming that your user collection has a language field filled with a valid ISO 639–1 language code_

<script src="https://gist.github.com/pmary/547f9c99903f448dfc4320a388062354.js">
</script>

Using a publication rather than a hook or a collection level transform allow us to translate the collection only when we wanted to. It allow you to create another publication, without this translation mechanism, to get the raw documents, which can be useful for an admin interface where you have to display every documents values.
