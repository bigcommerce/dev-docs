# How API Documentation Fails

Gias Uddin and Martin P. Robillard

We concluded that the most pressing probasdfasdflems were related to content, as opposed to presentation

```jsx
servers:
  - url: 'https://{your_server}'
    variables:
      your_server:
        default: store.example.com
```

![Untitled](How%20API%20Documentation%20Fails%2009493eb03c2645eb817956ea82463d47/Untitled.png)

- **Content**
    - The first type of content problem was i**ncompleteness**. In the trivial case, documentation can be incomplete owing to the lack of effort invested in it:
        - "I have had to deal with lots of auto-generated documentation, with no documentation at all for many classes or methods. (respondent R2:3)"
        - However, even when earnest effort is invested in documenting an API, it can be difficult to anticipate all the ways it can be used. When an API element might be involved in complex interactions with other API elements, understanding how to use it might require more than the description of its functionality.
    - The second content problem was **ambiguity**. In this case, the documentation appears to cover a topic of interest but leaves out important details so that multiple interpretations are possible. In a way, ambiguity is a form of incompleteness, but where the missing information is of a specific, clarifying nature. Nevertheless, the respondents reacted differently to each type of problem. In the case of incompleteness, they mentioned missing information; in the case of ambiguity, they mentioned confusion or incomprehension.
    - The third content problem was **unexplained examples**. Although developers generally appreciate code examples, some respondents were frustrated when an example didn’t have an adequate explanation.
        - Indeed, as Seyed Nasehi and his colleagues reported in their study of the code examples posted on the Stack Overflow website ([http://stackoverflow.com](http://stackoverflow.com/)), “explanations accompanying an example are as important as the examples themselves.”
    - The first type of presentation problem was **bloat**. The risk with associating large chunks of text to a specific element or topic is that readers won’t readily be able to determine whether the text provides the information they seek, especially when the title or header is general. For example, R1:31 was trying to understand some of the advantages of using a cluster installation:
        - "This introductory section is so bloated that it was hard to understand why it has so much text at all, when the introduction gives neither an overview nor the purpose of clustering."
    - The fourth content problem was **obsoleteness**. When APIs go through rapid development, their documentation can quickly become outdated, so the current documentation often doesn’t reflect recent changes.
    - The fifth content problem was **inconsistency**. Software development can be incremental, with multiple products often combining into a new product. These intermediate products can be developed by more than one development team, leading to inconsistent documents with insufficient explanation on how to support the interoperability between the intermediate products.
    - The final content problem was **incorrectness**. An API element’s description can be incorrect. For example, the input parameters and output type of an API method as implemented in the source code can differ from those in the documentation.
- **Presentation**
    - The second presentation problem was **fragmentation**. When the respondents had to click through multiple pages of an API document to learn the functionality and use of an API element, they found the separation of the descriptions at such a micro level to be unnecessary (as Martin Robillard and Robert DeLine also observed1). For example, unlike other APIs, Dojo APIs adhere to a two-layer description format of each function. The first page (called the “API document”) provides an overview of the functionality with a code example. The second page (called the “usage document”) describes the related parameters—for example, the underlying environment or server. R1:22 commented:
        - "This information (functionality description and usage configuration) should be part of the API, instead of separated into two documents: API and usage. "
        - The respondents had difficulty navigating through the myriad pages in an API document to find information:
            - "Fragmented documentation I find really difficult to use, where you have to have 10s of clicks through links to find the information you need, and page after page to read."
    - The third presentation problem was **excessive structural information**. The description of a type (class or interface) in object-oriented APIs normally includes structural relations with other types of the API.
    - The final presentation problem was **tangled information**. Respondents considered the explanation of APIs with specific usage scenarios helpful, but not when multiple usage scenarios were tangled with each other in one description.

![Untitled](How%20API%20Documentation%20Fails%2009493eb03c2645eb817956ea82463d47/Untitled%201.png)

**In any case, the analysis clearly confirmed that incompleteness, incorrectness, and ambiguity were most in need of attention.**