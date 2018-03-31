var Quic;
(function (Quic) {
    Quic.renders = {};
    Quic.binders = {};
    var idseed = 0;
    function newViewId() {
        if (idseed++ == 2100000000)
            idseed = 0;
        return idseed;
    }
    Quic.newViewId = newViewId;
    var opts = {
        "type": "form",
        "children": [
            {
                "@type": "panel",
                "@caption": "{GroupName}",
                "@children": [
                    {
                        "@type": "text",
                        "@value": "{data.username}",
                        "@disable": "${perms.username==='disabled'}",
                        "@readonly": "${perms.username==='readonly'}"
                    }
                ]
            }
        ]
    };
})(Quic || (Quic = {}));
