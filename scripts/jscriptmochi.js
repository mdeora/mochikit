/**

run with:
cscript.exe //nologo scripts\jscriptmochi.js

**/
var print = function (s) {
    WScript.Echo(s);
};
var MochiKit = {__export__:true};
var JSAN = {
    global: this,
    use: function (module, symbols) {
        if (this !== JSAN.global) { 
            return arguments.callee.apply(JSAN.global, arguments);
        }
        var components = module.split(/\./);
        var fn = components.join('\\') + '.js';
        var o = JSAN.global;
        var i, c;
        for (i = 0; i < components.length; i++) {
            o = o[components[i]];
            if (typeof(o) == 'undefined') {
                break;
            }
        }
        if (typeof(o) != 'undefined') {
            return o;
        }

        // Instantiate a File System ActiveX Object:
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var textStream = fso.OpenTextFile(fn, 1);
        var contents = textStream.ReadAll();
        eval(contents);
        
        o = JSAN.global;
        for (i = 0; i < components.length; i++) {
            o = o[components[i]];
            if (typeof(o) == 'undefined') {
                return undefined;
            }
        }
        if (!symbols) {
            var tags = o.EXPORT_TAGS;
            if (tags) {
                symbols = tags[':common'] || tags[':all'];
            }
        }
        if (symbols) {
            for (i = 0; i < symbols.length; i++) {
                c = symbols[i];
                JSAN.global[c] = o[c];
            }
        }
        return o;
    }
};
JSAN.use('MochiKit.MockDOM');
var window = this;
var document = MochiKit.MockDOM.createDocument();
JSAN.use('MochiKit.MochiKit');

JSAN.use('MochiKit.Test');

print("[[ MochiKit.Base ]]");
runTests('tests.test_Base');
print("[[ MochiKit.Color ]]");
runTests('tests.test_Color');
print("[[ MochiKit.DateTime ]]");
runTests('tests.test_DateTime');
print("[[ MochiKit.Format ]]");
runTests('tests.test_Format');
print("[[ MochiKit.Iter ]]");
runTests('tests.test_Iter');
print("[[ MochiKit.Logging ]]");
runTests('tests.test_Logging');