<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs"
    xmlns:tei="http://www.tei-c.org/ns/1.0" version="2.0">
    <xsl:output encoding="UTF-8" media-type="text/html" method="html" version="5.0" indent="yes"
        omit-xml-declaration="yes"/>

    <xsl:template match="/">

        <html lang="en" class="h-100">
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Permalink playground</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
                    crossorigin="anonymous"/>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
            </head>
            <body class="d-flex flex-column h-100">

                <main class="flex-shrink-0 flex-grow-1">
                    <div class="container">
                        <h1 class="text-center pt-5">
                            <xsl:value-of select=".//tei:titleStmt/tei:title/text()"/>
                        </h1>
                        <p class="lead text-center"><xsl:value-of select=".//tei:titleStmt/tei:author/text()"/></p>
                        <div class="alert alert-info" role="alert">
                            <ul>
                                <li>Annotations are loaded from json files; location of the file can be passed in via <code>annotations</code> url parameter.</li>
                                <li>To get start and end ids, select the text you'd like to annotate.</li>
                                <li>Demo; selection and hightlighting are subject to further improvement.</li>
                            </ul>
                        </div>
                        
                        <div class="btn-group" role="group" aria-label="Basic outlined example">
                            <a type="button" class="btn btn-outline-primary" href="https://karl-kraus.github.io/permalinkythinky/?annotations=https://karl-kraus.github.io/permalinkythinky/annotations/a.json">Anmerkungen A</a>
                            <a type="button" class="btn btn-outline-primary" href="https://karl-kraus.github.io/permalinkythinky/?annotations=https://karl-kraus.github.io/permalinkythinky/annotations/b.json">Anmerkungen B</a>  
                            <a type="button" class="btn btn-outline-primary" href="https://karl-kraus.github.io/permalinkythinky">Keine Anmerkungen</a></div>
                    
                        <div class="main-text">
                            <xsl:apply-templates select=".//tei:body"></xsl:apply-templates>
                        </div>
                    	<div class="blockquote-footer">
                    		<xsl:value-of select="//tei:sourceDesc/tei:p"/>
                    	</div>
                    	
                    </div>
                    <!-- Bootstrap Modal -->
                    <div class="modal fade" id="selectionModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                   <h1 class="modal-title" id="exampleModalLabel">Selected Range URL</h1>
                                </div>
                                <div class="modal-body">
                                   <p class="lead">To cite the selected range, please use the following URL:</p>
                                   <p id="permalink"></p>
                                   <hr />
                                   <p class="lead">To create a new annotation for the selected range, start with the snippet below:</p>
                                   <p id="modalText"></p>
                                	<p class="lead">... and insert it into your JSON file. Use the JSON URL as the value for the "annotations" parameter.</p>
                                </div>
                                <div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button></div>
                             </div>
                        </div>
                    </div>
                                        
                </main>
                <footer class="py-3 bg-body-tertiary">
                    <div class="text-center">
                        <a href="https://github.com/karl-kraus/permalinkythinky">
                            <i aria-hidden="true" class="bi bi-github fs-2"></i>
                            <span class="visually-hidden">GitHub repo</span>
                        </a>
                    </div>
                </footer>


                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"/>
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
                <script src="main.js"></script>
            </body>
        </html>
    </xsl:template>
    
    
    <xsl:template match="tei:lb">
        <br />
    </xsl:template>
	
	<xsl:template match="tei:hi">
		<span class="spacing" style="letter-spacing: 0.2rem;">
			<xsl:apply-templates/>
		</span>
	</xsl:template>
    
    <xsl:template match="tei:fw">
        <span class="forme-work ps-5">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:anchor[@xml:id]">
        <span class="permalinky">
            <xsl:attribute name="id">
                <xsl:value-of select="data(./@xml:id)"/>
            </xsl:attribute>
        </span>
    </xsl:template>
    
	<xsl:template match="tei:p[@xml:id and @rend='title']">
		<p class="h3">
			<xsl:attribute name="id">
				<xsl:value-of select="data(./@xml:id)"/>
			</xsl:attribute>
			<xsl:apply-templates/>
		</p>
	</xsl:template>
    
    <xsl:template match="tei:p[@xml:id and @rend='paragraph']">
        <p>
            <xsl:attribute name="id">
                <xsl:value-of select="data(./@xml:id)"/>
            </xsl:attribute>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    
    

</xsl:stylesheet>
