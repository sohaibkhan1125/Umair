'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function HtmlEncoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const htmlEntities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '©': '&copy;',
    '®': '&reg;',
    '™': '&trade;',
    '€': '&euro;',
    '£': '&pound;',
    '¥': '&yen;',
    '¢': '&cent;',
    '§': '&sect;',
    '¶': '&para;',
    '†': '&dagger;',
    '‡': '&Dagger;',
    '•': '&bull;',
    '…': '&hellip;',
    '–': '&ndash;',
    '—': '&mdash;',
    '°': '&deg;',
    '±': '&plusmn;',
    '×': '&times;',
    '÷': '&divide;',
    '¼': '&frac14;',
    '½': '&frac12;',
    '¾': '&frac34;',
    '¹': '&sup1;',
    '²': '&sup2;',
    '³': '&sup3;',
    'µ': '&micro;',
    '∞': '&infin;',
    '≠': '&ne;',
    '≈': '&asymp;',
    '≤': '&le;',
    '≥': '&ge;',
    '∑': '&sum;',
    '∏': '&prod;',
    '√': '&radic;',
    '∂': '&part;',
    '∆': '&Delta;',
    '∏': '&prod;',
    '∑': '&sum;',
    '∓': '&mp;',
    '∞': '&infin;',
    '∝': '&prop;',
    '∅': '&empty;',
    '∈': '&isin;',
    '∉': '&notin;',
    '∋': '&ni;',
    '∏': '&prod;',
    '∑': '&sum;',
    '−': '&minus;',
    '∗': '&lowast;',
    '∘': '&compfn;',
    '∙': '&bull;',
    '√': '&radic;',
    '∝': '&prop;',
    '∞': '&infin;',
    '∟': '&angrt;',
    '∠': '&ang;',
    '∡': '&angmsd;',
    '∢': '&angsph;',
    '∣': '&mid;',
    '∤': '&nmid;',
    '∥': '&parallel;',
    '∦': '&npar;',
    '∧': '&and;',
    '∨': '&or;',
    '∩': '&cap;',
    '∪': '&cup;',
    '∫': '&int;',
    '∬': '&Int;',
    '∭': '&tint;',
    '∮': '&oint;',
    '∯': '&DoubleContourIntegral;',
    '∰': '&Cconint;',
    '∱': '&cwint;',
    '∲': '&cwconint;',
    '∳': '&awconint;',
    '∴': '&there4;',
    '∵': '&because;',
    '∷': '&ratio;',
    '∸': '&Colon;',
    '∹': '&minusd;',
    '∺': '&mDDot;',
    '∻': '&homtht;',
    '∼': '&sim;',
    '∽': '&backsim;',
    '∾': '&bsim;',
    '∿': '&ac;',
    '≀': '&acd;',
    '≁': '&nsim;',
    '≂': '&eqsim;',
    '≃': '&simeq;',
    '≄': '&nsime;',
    '≅': '&cong;',
    '≆': '&ncong;',
    '≇': '&asymp;',
    '≈': '&asymp;',
    '≉': '&napprox;',
    '≊': '&ape;',
    '≋': '&apid;',
    '≌': '&bcong;',
    '≍': '&asympeq;',
    '≎': '&bump;',
    '≏': '&bumpe;',
    '≐': '&esdot;',
    '≑': '&eDot;',
    '≒': '&efDot;',
    '≓': '&erDot;',
    '≔': '&colone;',
    '≕': '&ecolon;',
    '≖': '&ecir;',
    '≗': '&cire;',
    '≘': '&awint;',
    '≙': '&qint;',
    '≚': '&amalg;',
    '≛': '&smashp;',
    '≜': '&topbot;',
    '≝': '&top;',
    '≞': '&topcir;',
    '≟': '&ap;',
    '≠': '&ne;',
    '≡': '&equiv;',
    '≢': '&nequiv;',
    '≣': '&Equiv;',
    '≤': '&le;',
    '≥': '&ge;',
    '≦': '&leqq;',
    '≧': '&geqq;',
    '≨': '&lne;',
    '≩': '&gne;',
    '≪': '&ll;',
    '≫': '&gg;',
    '≬': '&between;',
    '≭': '&NotCupCap;',
    '≮': '&nlt;',
    '≯': '&ngt;',
    '≰': '&nle;',
    '≱': '&nge;',
    '≲': '&lsim;',
    '≳': '&gsim;',
    '≴': '&nlsim;',
    '≵': '&ngsim;',
    '≶': '&lg;',
    '≷': '&gl;',
    '≸': '&ntlg;',
    '≹': '&ntgl;',
    '≺': '&pr;',
    '≻': '&sc;',
    '≼': '&pre;',
    '≽': '&sce;',
    '≾': '&prsim;',
    '≿': '&scsim;',
    '⊀': '&npr;',
    '⊁': '&nsc;',
    '⊂': '&sub;',
    '⊃': '&sup;',
    '⊄': '&nsub;',
    '⊅': '&nsup;',
    '⊆': '&sube;',
    '⊇': '&supe;',
    '⊈': '&nsube;',
    '⊉': '&nsupe;',
    '⊊': '&subne;',
    '⊋': '&supne;',
    '⊌': '&cupdot;',
    '⊍': '&uplus;',
    '⊎': '&sqsub;',
    '⊏': '&sqsup;',
    '⊐': '&sqsube;',
    '⊑': '&sqsupe;',
    '⊒': '&sqcap;',
    '⊓': '&sqcup;',
    '⊔': '&oplus;',
    '⊕': '&ominus;',
    '⊖': '&otimes;',
    '⊗': '&osol;',
    '⊘': '&odot;',
    '⊙': '&ocir;',
    '⊚': '&oast;',
    '⊛': '&odash;',
    '⊜': '&plusb;',
    '⊝': '&minusb;',
    '⊞': '&timesb;',
    '⊟': '&sdotb;',
    '⊠': '&vdash;',
    '⊡': '&dashv;',
    '⊢': '&top;',
    '⊣': '&bottom;',
    '⊤': '&models;',
    '⊥': '&vDash;',
    '⊦': '&Vdash;',
    '⊧': '&Vvdash;',
    '⊨': '&VDash;',
    '⊩': '&nvdash;',
    '⊪': '&nvDash;',
    '⊫': '&nVdash;',
    '⊬': '&nVDash;',
    '⊭': '&prurel;',
    '⊮': '&scurel;',
    '⊯': '&vltri;',
    '⊰': '&vrtri;',
    '⊱': '&ltrie;',
    '⊲': '&rtrie;',
    '⊳': '&origof;',
    '⊴': '&imof;',
    '⊵': '&mumof;',
    '⊶': '&hercon;',
    '⊷': '&intcal;',
    '⊸': '&rfloor;',
    '⊹': '&lfloor;',
    '⊺': '&jfr;',
    '⊻': '&jopf;',
    '⊼': '&jscr;',
    '⊽': '&jcy;',
    '⊾': '&jmath;',
    '⊿': '&jsercy;',
    '⋀': '&xwedge;',
    '⋁': '&xvee;',
    '⋂': '&xcap;',
    '⋃': '&xcup;',
    '⋄': '&diam;',
    '⋅': '&sdot;',
    '⋆': '&sstarf;',
    '⋇': '&divonx;',
    '⋈': '&bowtie;',
    '⋉': '&ltimes;',
    '⋊': '&rtimes;',
    '⋋': '&lthree;',
    '⋌': '&rthree;',
    '⋍': '&bsime;',
    '⋎': '&cuvee;',
    '⋏': '&cuwed;',
    '⋐': '&Sub;',
    '⋑': '&Sup;',
    '⋒': '&Cap;',
    '⋓': '&Cup;',
    '⋔': '&fork;',
    '⋕': '&epar;',
    '⋖': '&ltdot;',
    '⋗': '&gtdot;',
    '⋘': '&Ll;',
    '⋙': '&Gg;',
    '⋚': '&leg;',
    '⋛': '&gel;',
    '⋜': '&cuepr;',
    '⋝': '&cuesc;',
    '⋞': '&lnap;',
    '⋟': '&gnap;',
    '⋠': '&lnE;',
    '⋡': '&gnE;',
    '⋢': '&lsim;',
    '⋣': '&gsim;',
    '⋤': '&nsim;',
    '⋥': '&sime;',
    '⋦': '&nsime;',
    '⋧': '&cong;',
    '⋨': '&ncong;',
    '⋩': '&asymp;',
    '⋪': '&napprox;',
    '⋫': '&ape;',
    '⋬': '&apid;',
    '⋭': '&bcong;',
    '⋮': '&asympeq;',
    '⋯': '&bump;',
    '⋰': '&bumpe;',
    '⋱': '&esdot;',
    '⋲': '&eDot;',
    '⋳': '&efDot;',
    '⋴': '&erDot;',
    '⋵': '&colone;',
    '⋶': '&ecolon;',
    '⋷': '&ecir;',
    '⋸': '&cire;',
    '⋹': '&awint;',
    '⋺': '&qint;',
    '⋻': '&amalg;',
    '⋼': '&smashp;',
    '⋽': '&topbot;',
    '⋾': '&top;',
    '⋿': '&topcir;',
  };

  const encodeHtml = (text) => {
    return text.replace(/[&<>"']/g, char => htmlEntities[char] || char);
  };

  const decodeHtml = (text) => {
    const entities = Object.entries(htmlEntities).reduce((acc, [key, value]) => {
      acc[value] = key;
      return acc;
    }, {});
    
    return text.replace(/&[^;]+;/g, entity => entities[entity] || entity);
  };

  const handleEncode = () => {
    if (!input.trim()) {
      toast.error('Please enter some text to encode');
      return;
    }
    setOutput(encodeHtml(input));
  };

  const handleDecode = () => {
    if (!input.trim()) {
      toast.error('Please enter some text to decode');
      return;
    }
    setOutput(decodeHtml(input));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard!');
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    toast.success('Cleared all fields');
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">HTML Encoder/Decoder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input">Input Text</Label>
              <Textarea
                id="input"
                placeholder="Enter text to encode/decode..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[200px] font-mono"
              />
            </div>

            <div className="flex justify-center space-x-4">
              <Button onClick={handleEncode} className="w-32">
                Encode
              </Button>
              <Button onClick={handleDecode} className="w-32">
                Decode
              </Button>
              <Button onClick={handleClear} variant="outline" className="w-32">
                <RefreshCw className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="output">Output</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-8 px-2"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea
                id="output"
                value={output}
                readOnly
                className="min-h-[200px] font-mono bg-muted"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

