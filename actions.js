const fetch = require("node-fetch");

/**
 * 
 * @param  psid
 * @param  message
 */
exports.handlemessage = (psid, message) => {
  if (message.text === "Comment vas-tu ?") {
    callQuickReplyAPI(psid);
  } else if (message.attachments) {
    callSendAPI(psid, "Je ne sais pas traiter ce type de demande.")
  } else {
    callSendAPI(psid, message.text);
  }
};


/**
 * 
 * @param psid 
 * @param response 
 * Send text to client
 */
var callSendAPI = (psid, response) => {
  let request_body = {
    recipient: {
      id: psid
    },
    message: {
      text: response
    }
  };

  fetch(
      "https://graph.facebook.com/v6.0/me/messages?access_token=" +
      process.env.PAGE_ACCESS_TOKEN, {
        method: "post",
        body: JSON.stringify(request_body),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(res => res.json())
    .then(json => console.log(json));
};

/**
 * 
 * @param  psid 
 * Send a QuickReply to client
 */
var callQuickReplyAPI = psid => {
  let request_body = {
    recipient: {
      id: psid
    },
    messaging_type: "RESPONSE",
    message: {
      text: "Très bien et vous ?",
      quick_replies: [{
          content_type: "text",
          title: "Je vais bien, merci.",
          payload: "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GOOD"
        },
        {
          content_type: "text",
          title: "Non, ça ne va pas.",
          payload: "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_NOT_GOOD"
        }
      ]
    }
  };

  fetch(
      "https://graph.facebook.com/v6.0/me/messages?access_token=" +
      process.env.PAGE_ACCESS_TOKEN, {
        method: "post",
        body: JSON.stringify(request_body),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(res => res.json())
    .then(json => console.log(json));
};