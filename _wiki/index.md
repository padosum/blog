---
layout  : wikiindex
title   : wiki
date    : 2017-11-26 21:38:36 +0900
updated : 2020-03-16 22:03:22 +0900
tags    : index
toc     : true
public  : true
comment : false
---

* [[Movies-with-a-computer]]
* JavaScript
	* [[Javascript-regular-expression]]
	* [[Javascript-Scope]]
	* [[Javascript-Destructuring-assignment]]

* Git
	* [[New-branch-not-showing-in-visual-studio]]
	* [[Fetch]]
* 개발환경
	* [[Frontend-development-environment]]
---

# blog
<div>
    <ul>
{% for post in site.posts %}
    {% if post.public != false %}
        <li>
            <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">
                {{ post.title }}
            </a>
        </li>
    {% endif %}
{% endfor %}
    </ul>
</div>
