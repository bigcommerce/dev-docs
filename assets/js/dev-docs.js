function jotForm(){
	var jotFormScript = document.createElement('script');
    jotFormScript.type = 'text/javascript';
    jotFormScript.src = "https://form.jotform.com/static/feedback2.js"
    jotFormScript.text = 'new JotformFeedback({formId: "80163258305149",buttonText: "Docs Feedback",base: "https://form.jotform.com/",background: "#4E75F8",fontColor: "#FFFFFF",buttonSide: "right", buttonAlign: "center",type: 1,width: 530,height: 500,isCardForm: false});'
	document.body.appendChild(jotFormScript);
}

function changeLog(){
    var noticeScript = document.createElement('script');
    noticeScript.type = 'text/javascript';
    noticeScript.src = "https://cdn.noticeable.io/v1/noticeable-widget.js"
    document.body.appendChild(noticeScript);
  
	  var target = document.getElementsByClassName('HubHeader-section')[0];
		var noticeableWidget= document.createElement('noticeable-widget');
      noticeableWidget.setAttribute('class', 'HubHeaderItem NoticeableWidget');
      noticeableWidget.id = 'custom-eye-catching-animation';
      noticeableWidget.setAttribute('access-token', 'I8jRV1nwLLaUUZBQZSep');
      noticeableWidget.setAttribute('project-id', 'Q8YuGWPOCMmZDwnKUywV');
      noticeableWidget.setAttribute('trigger-eye-catching','false')
		target.appendChild(noticeableWidget);
}

function animationHeader(){
	var script = document.createElement('script');
	 script.type = 'text/javascript';
	 script.src = 'https://storage.googleapis.com/bigcommerce-production-dev-center/scripts/lottie.js';
	 script.onload = function loadAnimation(theObject) {
		var container = document.getElementById('animateBg');
		lottie.loadAnimation({
			container: container, // the dom element that will contain the animation
			renderer: 'svg',
			loop: true,
			autoplay: true,
			path: 'https://storage.googleapis.com/bigcommerce-production-dev-center/scripts/data.json' // the path to the animation json
		});
	}
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(script);
}

function start() {
  
  window.noticeableSettings = {
  iframe: {
  // The selector to use for selecting the iframe HTML element on this page.
  selector: '.noticeable',
  // The URL to the Noticeable Timeline served by the iframe.
  timelineUrl: 'https://timeline.noticeable.io/Q8YuGWPOCMmZDwnKUywV'
  }
  };

    animationHeader();
	changeLog();
	jotForm();
}

window.onload = start;