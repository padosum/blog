---
layout  : wikiindex
title   : wiki
date    : 2017-11-26 21:38:36 +0900
updated : 2020-02-02 00:02:14 +0900
tags    : index
toc     : true
public  : true
comment : false
---

* [[Movies-with-a-computer]]
* JavaScript
	* [[Javascript-regular-expression]]
	* [[Javascript-Scope]]
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
