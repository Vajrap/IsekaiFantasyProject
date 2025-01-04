export var WebSocketMessageType;
(function (WebSocketMessageType) {
    WebSocketMessageType["CONNECT"] = "CONNECT";
    WebSocketMessageType["PING"] = "PING";
    WebSocketMessageType["PONG"] = "PONG";
    WebSocketMessageType["PARTY_DATA"] = "PARTY_DATA";
})(WebSocketMessageType || (WebSocketMessageType = {}));
