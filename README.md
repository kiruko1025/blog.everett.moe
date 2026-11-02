# blog.everett.moe

Everett’s blog, built with Jekyll and local layouts that match [everett.moe](https://everett.moe). The blog lives in this `blog` folder and remains an independent GitHub Pages repository.

## Preview locally

```sh
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve
```

Open `http://127.0.0.1:4000`.

## Write

Add Markdown posts to `_posts` using the filename format `YYYY-MM-DD-title.md`:

```yaml
---
layout: post
title: Your post title
author: Everett Xu
tags: [notes]
description: A short description of the post.
---
```

Write the body below the front matter in Markdown. Optional `reading_time` and `toc` fields follow the existing posts. Posts are listed newest first; tags and the Atom feed at `/feed.xml` update automatically. Existing post URLs retain the `/:year-:month-:day/:title` structure.

Use `bundle exec jekyll build` to produce `_site/`. The original three Markdown posts are preserved unchanged. Shared layout is in `_layouts/default.html`, the sidebar is in `_includes/navigation.html`, and appearance is in `assets/blog.css`. Fonts are served locally with their license in `assets/Jost-OFL.txt`.

The existing Disqus integration is retained with shortname `everett-boo` and the original per-post identifiers. Set `disqus` to an empty value in `_config.yml` to disable it. The canonical site URL and CNAME are both `blog.everett.moe`; its DNS record must point to the GitHub Pages host before the custom domain can serve the blog.
