
var chat = function() {
	var submitRef;
	var entryRef;
	var chatRef;
	var debugRef;
	var clientId = Math.random();
	var latestId = -1;
	var seenIds = [];
	
	var ip2Color = {};
	
	var colors = [
		'red',
		'green',
		'blue',
		'orange',
		'purple',
		'#339999',
		'#666',
		'#393939',
		'#e33933',
		'#b284d0',
		'#8a1e9c'
	];
	
	function debugMessage(message) {
		var markup = "<div>" + message + "</div>";
		debugRef.innerHTML += markup;
		debugRef.scrollTop = debugRef.scrollHeight;
	}
	
	function init() {
		submitRef = document.getElementById("sendBtn");
		entryRef = document.getElementById("entry");
		chatRef = document.getElementById("chatMessages");
		debugRef = document.getElementById("debug");
		debugMessage("Initialized!");
	}
	
	function sendHandler() {
		var message = entryRef.value;
		
		debugMessage("Sending message");
		
		submitRef.value = "Send...";
		submitRef.disabled = true;
		entryRef.disabled = true;
		
		var node = document.createElement("script");
		node.src = "/api/send/?clientId=" + clientId + "&content=" + message + "&rand=" + Math.random();
		document.body.appendChild(node);
		debugMessage("Script node appended");
	}
	
	function bindHandlers() {
		debugMessage("Binding handlers");
		submitRef.onclick = sendHandler;
		entryRef.onkeyup = function(e) {
			if(e.keyCode == 13) {
				sendHandler();
			}
		};
	}
	
	function getColor(ip) {
		if(!ip2Color[ip]) {
			ip2Color[ip] = colors.pop();
		}
		return ip2Color[ip];
	}
	
	function processMessages(jsonString) {
		debugMessage("Processing messages");
		var messages = json_parse(jsonString).response;
		for(var i=0; i < messages.length; i++) {
			var message = messages[i];
			var prefix = "<font color='" + (message.clientId == clientId ? '#000' : getColor(message.ip)) + "'>" + message.ip + "</font>";
			var markup = "<div id='msg" + message.sequence + "'><span>" + prefix + "</span>: " + message.content + "</div>";
			if(seenIds.indexOf(message.sequence) === -1) {
				chatRef.innerHTML += markup;
				seenIds.push(message.sequence);
			}
			latestId = message.sequence;
		}
		chatRef.scrollTop = chatRef.scrollHeight;
		debugMessage("Finished processing messages");
	}
	
	function handleXHRResponse() {
		if(this.readyState != 4) { return; }
		if(this.status == 200) {
			debugMessage("Got 200 response"); 
			processMessages(this.responseText);
			startPuller();
		} else {
			debugMessage("Error or timeout, restarting");
			startPuller();
		}
	}
	
	function startPuller() {
		debugMessage("Starting new XHR"); 
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = handleXHRResponse;
		xhr.open("GET", "/api/poll/" + latestId, true);
		xhr.send();
	}
	
	return {
		start: function() {
			init();
			bindHandlers();
			startPuller();
		},
		receiveSendResponse: function(response) {
			if(response.status == 200) {
				debugMessage("Message sent successfully"); 
				entryRef.value = "";
			} else {
				debugMessage("Message sending failed"); 
			}
			entryRef.disabled = false;
			submitRef.value = "Send";
			submitRef.disabled = false;
		},
	};
}();

