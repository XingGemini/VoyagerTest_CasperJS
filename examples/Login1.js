/*==============================================================================*/
/* Casper generated Thu May 21 2015 11:12:56 GMT-0700 (PDT) */
/*==============================================================================*/

var x = require('casper').selectXPath;
casper.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.');
casper.options.viewportSize = {width: 1280, height: 720};
casper.on('page.error', function(msg, trace) {
   this.echo('Error: ' + msg, 'ERROR');
   for(var i=0; i<trace.length; i++) {
       var step = trace[i];
       this.echo('   ' + step.file + ' (line ' + step.line + ')', 'ERROR');
   }
});
casper.test.begin('Resurrectio test', function(test) {
   casper.start();
   casper.thenOpenPath ('/login.html', function(){
          this.echo("start"); // "Google"
          this.echo(this.getCurrentUrl());
   });

   casper.waitForSelector("form input[name='userName']",
       function success() {
           test.assertExists("form input[name='userName']");
           this.click("form input[name='userName']");
       },
       function fail() {
           test.assertExists("form input[name='userName']");
   });
   casper.waitForSelector("input[name='userName']",
       function success() {
           this.sendKeys("input[name='userName']", "xxu+00all@completegenomics.com");
       },
       function fail() {
           test.assertExists("input[name='userName']");
   });
   casper.waitForSelector("form input[name='password']",
       function success() {
           test.assertExists("form input[name='password']");
           this.click("form input[name='password']");
       },
       function fail() {
           test.assertExists("form input[name='password']");
   });
   casper.waitForSelector("input[name='password']",
       function success() {
           this.sendKeys("input[name='password']", "Complete1");
       },
       function fail() {
           test.assertExists("input[name='password']");
   });
   casper.waitForSelector(x("//a[normalize-space(text())='Log In']"),
       function success() {
           test.assertExists(x("//a[normalize-space(text())='Log In']"));
           this.click(x("//a[normalize-space(text())='Log In']"));
       },
       function fail() {
           test.assertExists(x("//a[normalize-space(text())='Log In']"));
   });
   
  casper.waitForUrl(/index\.html/, function() {
	  this.echo('new page');
      this.echo(this.getCurrentUrl());
      this.echo(this.getTitle());
      this.capture("waitnewpage.png");
      
  });
  
  casper.waitForSelector(".cgIcon-hamburgerMenu",
	       function success() {
	           test.assertExists(".cgIcon-hamburgerMenu");
	           this.click(".cgIcon-hamburgerMenu");
	           this.echo(this.getCurrentUrl());
	           this.capture("index.png");
	       },
	       function fail() {
	           this.echo(this.getCurrentUrl());
	           this.capture("index_fail.png");
	           test.assertExists(".cgIcon-hamburgerMenu");
	   });

/*  casper.waitForSelector(".headerSingleText",
	   function success() {
	           test.assertExists(".headerSingleText");
	           //test.assertSelectorHasText('.headerSingleText', 'Cases');

  			},
	       function fail() {
	           test.assertExists(".headerSingleText");
	   });
	   
	   */
  /*
  casper.waitUntilVisible("div.headerSingleText",
       function success() {
           test.assertExists("div.headerSingleText");
           this.capture("waitnewpage.png");
          //test.assertSelectorHasText('.headerSingleText', 'Cases');
           // var txt = casper.fetchText(".headerSingleText");
           //test.assertEqvalEqual(txt, "Cases");
       },
       function fail() {
           this.capture("waitnewpage.png");
           test.assertExists("div.headerSingleText");
   });
   */
   casper.run(function() {test.done();});
});
