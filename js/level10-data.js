/* ============================================
   TLF Academy - Level 10: SASによるTLFプログラミング実践
   ============================================ */

const LEVEL10_DATA = {
    id: 10,
    title: "SASによるTLFプログラミング実践",
    icon: "💻",
    description: "SASを用いたTLF作成の実践的プログラミング技法を習得する",
    modules: [
        {
            id: 1001,
            title: "PROC REPORTの基礎",
            duration: "25分",
            content: `
<h2>PROC REPORTとは</h2>
<p><strong>PROC REPORT</strong>は、SASにおけるTLF（Tables, Listings, Figures）作成の中核となるプロシジャです。PROC PRINTやPROC TABULATEと比較して、柔軟なレイアウト制御と計算機能を備えており、規制当局向けの臨床試験帳票作成に最も広く使用されています。</p>

<h2>基本構文</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">proc report data=adsl nowd split='|'
    style(report)=[borderwidth=0]
    style(header)=[background=white font_weight=bold]
    style(column)=[background=white];

  columns trt01pn trt01p aession agegr1 n;

  define trt01pn / group noprint order=internal;
  define trt01p  / group "Treatment" order=internal;
  define aession / group "Age Group";
  define agegr1  / group "Category";
  define n       / analysis sum "n";

  break after trt01p / summarize;
run;</code></pre>
</div>

<h2>COLUMN文</h2>
<p>COLUMN文はレポートに表示する変数の順序と階層構造を定義します。</p>
<table>
<thead>
<tr><th>構文</th><th>説明</th><th>例</th></tr>
</thead>
<tbody>
<tr><td>変数名の列挙</td><td>左から右に表示される列を指定</td><td><code>columns subjid age sex;</code></td></tr>
<tr><td>カンマによるスパン</td><td>列ヘッダーのスパニング</td><td><code>columns subjid ("Demographics" age sex);</code></td></tr>
<tr><td>ACROSSとの組み合わせ</td><td>横展開による列の生成</td><td><code>columns param, (trt01pn, (n mean std));</code></td></tr>
</tbody>
</table>

<h2>DEFINE文</h2>
<p>各変数の役割（usage）と表示属性を制御します。</p>
<table>
<thead>
<tr><th>Usage</th><th>説明</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td><strong>DISPLAY</strong></td><td>各行をそのまま表示</td><td>Listing作成</td></tr>
<tr><td><strong>GROUP</strong></td><td>同じ値をグループ化</td><td>要約表のカテゴリ</td></tr>
<tr><td><strong>ACROSS</strong></td><td>値を列として横展開</td><td>投与群別の列作成</td></tr>
<tr><td><strong>ANALYSIS</strong></td><td>統計量の計算対象</td><td>N, Mean, Sum等</td></tr>
<tr><td><strong>ORDER</strong></td><td>ソート順で表示（重複表示なし）</td><td>来院番号等</td></tr>
<tr><td><strong>COMPUTED</strong></td><td>COMPUTE文で定義した計算変数</td><td>パーセント等</td></tr>
</tbody>
</table>

<h2>COMPUTE文</h2>
<p>COMPUTE文はレポート内で動的な計算や条件付き書式設定を行うための機能です。</p>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">proc report data=summary nowd;
  columns trt01p n pct;
  define trt01p / group "Treatment";
  define n      / display "n";
  define pct    / computed "%" format=5.1;

  compute pct;
    if _c2_ > 0 then pct = (_c2_ / total_n) * 100;
    else pct = 0;
  endcomp;

  compute after trt01p;
    line ' ';  /* グループ間に空行を挿入 */
  endcomp;
run;</code></pre>
</div>

<div class="info-box tip">
<div class="info-box-title">💡 _C列番号_ の使い方</div>
COMPUTE文内では、<code>_c2_</code>のように列番号で他の列を参照できます。ただし列の追加・削除時にずれるリスクがあるため、可能であれば変数名を直接使用しましょう。CHARACTER型変数は<code>_c2_</code>のように参照する必要があります。
</div>

<h2>PAGE制御</h2>
<p>臨床試験のTLFでは、投与群やパラメータごとにページを分けることが求められます。</p>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* 投与群ごとにページ分割 */
proc report data=adae nowd;
  columns trt01pn trt01p aebodsys aedecod n;
  define trt01pn / group noprint order=internal;
  define trt01p  / group page "Treatment";  /* PAGE オプション */
  define aebodsys / group "System Organ Class";
  define aedecod  / group "Preferred Term";
  define n        / analysis sum "n(%)";

  break after aebodsys / skip;  /* SOC間に空行 */
run;</code></pre>
</div>

<div class="info-box warning">
<div class="info-box-title">⚠️ 注意</div>
PAGE オプションを使用する際は、GROUP変数に指定する必要があります。DISPLAY変数にPAGEを指定するとエラーになります。また、ODS出力と組み合わせる場合は、STARTPAGE=NOオプションとの干渉に注意してください。
</div>
`,
            quiz: [
                { id: "q1001_1", type: "choice", question: "PROC REPORTのDEFINE文で、値を列として横展開するUsageはどれですか？", options: ["GROUP", "ACROSS", "DISPLAY", "ORDER"], answer: 1, explanation: "ACROSSは変数の値を列ヘッダーとして横展開し、投与群別の列などを作成するために使用します。" },
                { id: "q1001_2", type: "choice", question: "COMPUTE文内で3番目の列を参照する際の記法はどれですか？", options: ["_col3_", "_c3_", "_column3_", "#3"], answer: 1, explanation: "COMPUTE文内では _c列番号_ という形式（例: _c3_）で列を参照します。" },
                { id: "q1001_3", type: "choice", question: "PROC REPORTで投与群ごとにページを分割するために使用するオプションはどれですか？", options: ["NEWPAGE", "BREAK", "PAGE", "PAGEBREAK"], answer: 2, explanation: "DEFINE文でPAGEオプションを指定すると、その変数の値が変わるごとに改ページされます。" },
                { id: "q1001_4", type: "choice", question: "PROC REPORTのDEFINE文で、ソート順に表示し重複値を非表示にするUsageはどれですか？", options: ["GROUP", "ORDER", "DISPLAY", "ANALYSIS"], answer: 1, explanation: "ORDERは指定した変数のソート順で表示し、連続する同一値を非表示にします。GROUPと似ていますが、集約は行いません。" },
                { id: "q1001_5", type: "fill", question: "PROC REPORTで列ヘッダーの改行位置を指定するために使用するオプションは SPLIT='___' です（区切り文字は|を使う場合）。", answer: "|", explanation: "SPLIT='|' を指定すると、DEFINE文のラベル内で | を改行文字として使用できます。" }
            ]
        },
        {
            id: 1002,
            title: "ODS RTF/PDF出力",
            duration: "30分",
            content: `
<h2>ODS（Output Delivery System）概要</h2>
<p>臨床試験のTLFは最終的にRTFまたはPDF形式で出力されます。<strong>ODS</strong>はSASの出力配信システムであり、PROC REPORTなどの出力をこれらの形式に変換します。</p>

<h2>ODS RTF出力の基本</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">options nodate nonumber orientation=landscape;

ods rtf file="T_14_1_1.rtf"
    style=journal
    bodytitle
    startpage=no;

title1 j=l "Protocol: ABC-001" j=r "Page ^{pageof}";
title2 j=l "Table 14.1.1";
title3 j=c "Summary of Demographics";

footnote1 j=l "Source: adsl"
          j=r "Program: t_14_1_1.sas";
footnote2 j=l "N = Number of subjects in the Safety Population";

proc report data=final nowd split='|'
    style(report)=[borderwidth=0 cellpadding=4pt];
  /* ... 略 ... */
run;

ods rtf close;</code></pre>
</div>

<h2>ODS ESCAPECHAR</h2>
<p>ODS ESCAPECHARは、出力内で特殊な書式制御を行うための仕組みです。</p>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">ods escapechar='^';

/* 主な用途 */
title "P値 ^{super a}";           /* 上付き文字 */
title "H^{sub 2}O";               /* 下付き文字 */
title "^{style [fontweight=bold]重要}";  /* インラインスタイル */
title "Page ^{pageof}";           /* ページ番号 / 総ページ数 */
title "^{newline}";               /* 改行 */
title "^{unicode 2265}";          /* Unicode文字（≥） */
</code></pre>
</div>

<table>
<thead>
<tr><th>ESCAPEコード</th><th>説明</th><th>使用例</th></tr>
</thead>
<tbody>
<tr><td><code>^{super text}</code></td><td>上付き文字</td><td>p値の脚注参照</td></tr>
<tr><td><code>^{sub text}</code></td><td>下付き文字</td><td>化学式</td></tr>
<tr><td><code>^{pageof}</code></td><td>現在ページ/総ページ</td><td>ヘッダー右端</td></tr>
<tr><td><code>^{newline}</code></td><td>改行</td><td>セル内改行</td></tr>
<tr><td><code>^{unicode XXXX}</code></td><td>Unicode文字</td><td>≥、≤、±記号</td></tr>
<tr><td><code>^{style [...]}</code></td><td>インラインスタイル</td><td>太字、色変更</td></tr>
</tbody>
</table>

<h2>ODS PDF出力</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">options nodate nonumber orientation=landscape;

ods pdf file="T_14_1_1.pdf"
    style=journal
    startpage=no
    bookmarkgen=no
    pdftoc=0;

ods pdf style=styles.custom;  /* カスタムスタイルの適用 */

/* TLF出力 */
proc report data=final nowd;
  /* ... */
run;

ods pdf close;</code></pre>
</div>

<h2>STYLEオプション</h2>
<p>ODS出力の見た目はSTYLEで制御されます。臨床試験TLFでは、白背景・黒テキスト・最小限の罫線が標準です。</p>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">proc template;
  define style styles.tlf;
    parent = styles.journal;
    style body from body /
      marginleft = 1in
      marginright = 1in
      margintop = 1in
      marginbottom = 1in;
    style header from header /
      font_face = "Courier New"
      font_size = 9pt
      background = white
      font_weight = bold;
    style data from data /
      font_face = "Courier New"
      font_size = 9pt
      background = white;
    style systemtitle from systemtitle /
      font_face = "Courier New"
      font_size = 9pt;
    style systemfooter from systemfooter /
      font_face = "Courier New"
      font_size = 8pt;
  end;
run;</code></pre>
</div>

<div class="info-box tip">
<div class="info-box-title">💡 RTF特殊制御</div>
RTF出力では、以下のテクニックがよく使用されます：
<ul>
<li><strong>BODYTITLE</strong>：タイトル・脚注をRTFのヘッダー/フッターではなく本文領域に配置</li>
<li><strong>COLUMNS=</strong>：多段組みレイアウト</li>
<li><strong>\\keepn</strong>：RTF制御コードで段落の分割を防止</li>
<li><strong>STARTPAGE=NO</strong>：複数のPROC出力を同一ページに配置</li>
</ul>
</div>

<h2>ページ設定の最適化</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* Landscape A4: 297mm x 210mm */
options papersize=A4 orientation=landscape
        leftmargin=1in rightmargin=1in
        topmargin=0.75in bottommargin=0.75in;

/* Letter (US): 11in x 8.5in */
options papersize=letter orientation=landscape
        leftmargin=1in rightmargin=1in
        topmargin=0.5in bottommargin=0.5in;</code></pre>
</div>

<div class="info-box warning">
<div class="info-box-title">⚠️ RTF vs PDF の選択</div>
<ul>
<li><strong>RTF</strong>：レビュー段階で使用。医学ライターやチームメンバーがWord上でコメントを追加可能</li>
<li><strong>PDF</strong>：最終提出用。レイアウトが固定されるため規制当局提出に適する</li>
</ul>
多くの企業では、開発段階はRTF、提出段階はPDFを使用するワークフローを採用しています。
</div>
`,
            quiz: [
                { id: "q1002_1", type: "choice", question: "ODS RTFで上付き文字を表示するためのエスケープシーケンスはどれですか？", options: ["^{up text}", "^{super text}", "^{sup text}", "^{top text}"], answer: 1, explanation: "ODSでは ^{super text} を使って上付き文字を表示します。" },
                { id: "q1002_2", type: "choice", question: "ODS RTFでタイトルを本文領域に配置するオプションはどれですか？", options: ["TITLEAREA", "BODYTITLE", "INLINETITLE", "CONTENTTITLE"], answer: 1, explanation: "BODYTITLEオプションを指定すると、タイトルと脚注がRTFのヘッダー/フッター領域ではなく本文領域に配置されます。" },
                { id: "q1002_3", type: "choice", question: "ODS出力で「ページ X / Y」形式のページ番号を表示するエスケープコードはどれですか？", options: ["^{pagenum}", "^{pageof}", "^{page/total}", "^{currentpage}"], answer: 1, explanation: "^{pageof} は「現在のページ番号 / 総ページ数」を自動的に表示します。" },
                { id: "q1002_4", type: "choice", question: "臨床試験TLFの最終規制当局提出に通常使用されるファイル形式はどれですか？", options: ["RTF", "HTML", "PDF", "XLSX"], answer: 2, explanation: "PDFはレイアウトが固定されるため、最終的な規制当局への提出にはPDFが使用されます。RTFはレビュー段階で使用されます。" },
                { id: "q1002_5", type: "fill", question: "ODSで特殊文字のエスケープ処理を有効にする文は ods ___='文字'; です。", answer: "escapechar", explanation: "ods escapechar='文字'; で、その文字をエスケープ文字として使用し、上付き・下付き・ページ番号等の特殊出力が可能になります。" }
            ]
        },
        {
            id: 1003,
            title: "SASマクロによるTLF自動化",
            duration: "30分",
            content: `
<h2>TLF作成におけるマクロの役割</h2>
<p>臨床試験では数十〜数百のTLFを作成する必要があります。<strong>SASマクロ</strong>を活用することで、共通処理を標準化し、一貫性のある出力を効率的に生成できます。</p>

<h2>マクロの基本構文</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">%macro tlf_header(protocol=, study=, population=Safety,
                  output=, title=, pgm=);
  options nodate nonumber orientation=landscape;
  ods escapechar='^';

  ods rtf file="&output..rtf"
      style=styles.tlf
      bodytitle startpage=no;

  title1 j=l "Protocol: &protocol." j=r "Page ^{pageof}";
  title2 j=l "&study.";
  title3 j=c "&title.";
  title4 j=l "&population. Population";
%mend tlf_header;</code></pre>
</div>

<h2>共通フッターマクロ</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">%macro tlf_footer(source=, pgm=, note=);
  footnote1 j=l "Source: &source."
            j=r "Program: &pgm..sas";
  %if &note. ne %then %do;
    footnote2 j=l "&note.";
  %end;
  footnote3 j=l "%sysfunc(datetime(), datetime20.) / &sysuserid.";
%mend tlf_footer;</code></pre>
</div>

<h2>記述統計マクロ</h2>
<p>人口統計学的特性や有効性エンドポイントの要約に頻繁に使用される記述統計量を計算するマクロです。</p>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">%macro summary_stat(inds=, var=, byvar=, trtvar=trt01pn,
                    decimal=1, outds=stat_out);
  proc means data=&inds. noprint;
    by &byvar.;
    class &trtvar.;
    var &var.;
    output out=_stats
      n=n mean=mean std=std median=median
      min=min max=max q1=q1 q3=q3;
  run;

  data &outds.;
    set _stats(where=(_type_=1));
    length col1-col3 $40;
    /* n */
    col_n = strip(put(n, 8.));
    /* Mean (SD) */
    col_meansd = strip(put(mean, 8.&decimal.)) || " (" ||
                 strip(put(std, 8.&decimal.+1)) || ")";
    /* Median */
    col_median = strip(put(median, 8.&decimal.));
    /* Q1, Q3 */
    col_q1q3 = strip(put(q1, 8.&decimal.)) || ", " ||
               strip(put(q3, 8.&decimal.));
    /* Min, Max */
    col_minmax = strip(put(min, 8.&decimal.)) || ", " ||
                 strip(put(max, 8.&decimal.));
  run;
%mend summary_stat;</code></pre>
</div>

<h2>マクロ変数の活用</h2>
<table>
<thead>
<tr><th>テクニック</th><th>説明</th><th>例</th></tr>
</thead>
<tbody>
<tr><td><strong>CALL SYMPUTX</strong></td><td>データステップからマクロ変数を作成</td><td><code>call symputx('big_n', put(n, best.));</code></td></tr>
<tr><td><strong>PROC SQL INTO</strong></td><td>SQLで値をマクロ変数に格納</td><td><code>select count(*) into :nobs from adsl;</code></td></tr>
<tr><td><strong>%LET</strong></td><td>マクロ変数の直接定義</td><td><code>%let cutoff = 2024-01-15;</code></td></tr>
<tr><td><strong>%SYSFUNC</strong></td><td>SAS関数をマクロ内で使用</td><td><code>%sysfunc(today(), yymmdd10.)</code></td></tr>
</tbody>
</table>

<h2>Big N（投与群の被験者数）の取得</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">%macro get_bign(inds=adsl, trtvar=trt01pn, popflag=saffl, popval=Y);
  proc sql noprint;
    select count(*) into :bign1 - :bign3
    from &inds.
    where &popflag. = "&popval."
    group by &trtvar.
    order by &trtvar.;

    select count(*) into :bign_all
    from &inds.
    where &popflag. = "&popval.";
  quit;

  %let bign1 = %sysfunc(strip(&bign1.));
  %let bign2 = %sysfunc(strip(&bign2.));
  %let bign3 = %sysfunc(strip(&bign3.));
  %let bign_all = %sysfunc(strip(&bign_all.));

  %put NOTE: Big N - Trt1=&bign1., Trt2=&bign2., Trt3=&bign3., All=&bign_all.;
%mend get_bign;</code></pre>
</div>

<div class="info-box tip">
<div class="info-box-title">💡 マクロライブラリの管理</div>
企業やプロジェクトレベルでマクロライブラリを管理するのがベストプラクティスです：
<ul>
<li><strong>グローバルマクロ</strong>：全プロジェクト共通（%tlf_header, %tlf_footer, %summary_stat）</li>
<li><strong>プロジェクトマクロ</strong>：試験固有のロジック</li>
<li><code>SASAUTOS=</code>オプションで自動読み込みパスを設定</li>
<li>マクロのバージョン管理と変更履歴を文書化</li>
</ul>
</div>

<div class="info-box warning">
<div class="info-box-title">⚠️ マクロ開発の注意点</div>
<ul>
<li>マクロ変数のスコープ（%LOCAL / %GLOBAL）に注意する</li>
<li>%PUT文で中間結果を確認しデバッグする</li>
<li><code>MPRINT</code>, <code>MLOGIC</code>, <code>SYMBOLGEN</code>オプションでマクロ展開を確認</li>
<li>マクロパラメータにデフォルト値を設定し、使いやすさを向上させる</li>
</ul>
</div>
`,
            quiz: [
                { id: "q1003_1", type: "choice", question: "SASマクロデバッグで、マクロ変数の解決値を表示するオプションはどれですか？", options: ["MPRINT", "MLOGIC", "SYMBOLGEN", "MACROGEN"], answer: 2, explanation: "SYMBOLGENオプションは、マクロ変数が解決（展開）された値をログに表示します。MPRINTは展開後のSASコード、MLOGICはマクロ実行の論理フローを表示します。" },
                { id: "q1003_2", type: "choice", question: "データステップからマクロ変数を作成するために使用するルーチンはどれですか？", options: ["PUT MACRO", "CALL SYMPUTX", "SET MACRO", "%LET"], answer: 1, explanation: "CALL SYMPUTXは、データステップ内からマクロ変数を作成するために使用するCALLルーチンです。前後の空白も自動的に除去されます。" },
                { id: "q1003_3", type: "choice", question: "PROC SQL内で値をマクロ変数に格納する構文はどれですか？", options: ["SET :varname FROM", "INTO :varname", "AS MACRO :varname", "STORE :varname"], answer: 1, explanation: "PROC SQL内で SELECT ... INTO :マクロ変数名 の構文を使用して、クエリ結果をマクロ変数に格納します。" },
                { id: "q1003_4", type: "choice", question: "Big N（各投与群の被験者総数）は通常どのデータセットから取得しますか？", options: ["ADAE", "ADSL", "ADEFF", "ADLB"], answer: 1, explanation: "Big Nは被験者レベルのデータセットであるADSL（Analysis Data Subject Level）から、対象集団（Safety、ITT等）のフラグ条件で取得します。" },
                { id: "q1003_5", type: "fill", question: "SASマクロの自動検索パスを設定するシステムオプションは ___= です。", answer: "SASAUTOS", explanation: "SASAUTOS=オプションで、マクロライブラリの自動検索パスを設定します。%マクロ名 で呼び出した際に自動的にそのパスから読み込まれます。" }
            ]
        },
        {
            id: 1004,
            title: "実践的SASテクニック",
            duration: "30分",
            content: `
<h2>PROC TRANSPOSEによるデータ再構成</h2>
<p>TLF作成では、縦持ちデータを横持ちに変換（転置）する操作が頻繁に発生します。</p>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* 投与群別の統計量を横持ちに変換 */
proc transpose data=stats out=stats_t prefix=col;
  by paramcd param;
  id trt01pn;      /* 転置キー（列名の元になる変数） */
  idlabel trt01p;  /* 列ラベル */
  var value;       /* 転置する値 */
run;

/* 結果: paramcd | param | col1 | col2 | col3 */
/* col1=Placebo, col2=Low Dose, col3=High Dose */</code></pre>
</div>

<h2>PROC SQLによる集計</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* AE発現被験者数と発現率の計算 */
proc sql;
  create table ae_summary as
  select a.trt01pn, a.trt01p,
         a.aebodsys, a.aedecod,
         count(distinct a.usubjid) as n_subj,
         calculated n_subj / b.bign * 100 as pct format=5.1
  from adae a
  inner join (
    select trt01pn, count(distinct usubjid) as bign
    from adsl where saffl='Y'
    group by trt01pn
  ) b on a.trt01pn = b.trt01pn
  where a.saffl = 'Y'
  group by a.trt01pn, a.trt01p, a.aebodsys, a.aedecod
  order by a.trt01pn, a.aebodsys, a.aedecod;
quit;</code></pre>
</div>

<h2>フォーマットの活用</h2>
<p>TLF表示用の値フォーマットを定義して、出力の見た目を制御します。</p>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* カスタムフォーマットの定義 */
proc format;
  value trtfmt
    1 = "Placebo"
    2 = "Drug A 10mg"
    3 = "Drug A 20mg";

  value $sexfmt
    "M" = "Male"
    "F" = "Female";

  value agegrfmt
    1 = "<65"
    2 = ">=65";

  /* n(%) 表示用の picture format */
  picture pctfmt (round)
    0       = "   0" (noedit)
    0<-<10  = "9.9)" (prefix="(  " mult=10)
    10-<100 = "99.9)" (prefix="(" mult=10)
    100     = " 100)" (prefix="(");
run;</code></pre>
</div>

<h2>欠測値の処理</h2>
<p>臨床試験データでは欠測値の扱いが非常に重要です。TLFでの表示方法も明確に定義する必要があります。</p>

<table>
<thead>
<tr><th>状況</th><th>処理方法</th><th>TLF表示</th></tr>
</thead>
<tbody>
<tr><td>数値が欠測</td><td>特殊欠測値（.A, .B等）</td><td>空白 or "NE"</td></tr>
<tr><td>カテゴリが欠測</td><td>"Missing" カテゴリ追加</td><td>"Missing" 行に集計</td></tr>
<tr><td>n=0 のカテゴリ</td><td>0行をCOMPLETETYPES等で補完</td><td>"0" or "0 (0.0%)"</td></tr>
<tr><td>統計量計算不可</td><td>n<2でSD=欠測</td><td>"NE" or "-"</td></tr>
</tbody>
</table>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* ゼロカウントの補完（COMPLETETYPES） */
proc means data=adae completetypes noprint;
  class trt01pn aebodsys aedecod / preloadfmt;
  var aession;
  output out=ae_counts n=n;
  format trt01pn trtfmt.;
run;

/* 欠測値の表示制御 */
data display;
  set ae_counts;
  length col_val $20;
  if n = . then n = 0;
  if n = 0 then col_val = "0";
  else col_val = strip(put(n, best.)) || " (" ||
                 strip(put(n/bign*100, 5.1)) || ")";
run;</code></pre>
</div>

<h2>Big N計算とヘッダーへの反映</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* Big Nを列ヘッダーに反映 */
proc sql noprint;
  select count(distinct usubjid) into :n1-:n3
  from adsl
  where saffl = 'Y'
  group by trt01pn
  order by trt01pn;
quit;

proc report data=final nowd;
  columns trt01pn param col1 col2 col3;
  define col1 / "Placebo|N=&n1." style(column)=[width=2in];
  define col2 / "Drug 10mg|N=&n2." style(column)=[width=2in];
  define col3 / "Drug 20mg|N=&n3." style(column)=[width=2in];
run;</code></pre>
</div>

<div class="info-box tip">
<div class="info-box-title">💡 n(%)の表示パターン</div>
臨床試験TLFでのn(%)表示は企業やプロジェクトによって異なります。一般的なパターン：
<ul>
<li><code>12 (34.5%)</code> - 最も一般的</li>
<li><code>12 (34.5)</code> - %記号なし</li>
<li><code>12 ( 34.5)</code> - 右揃え対応</li>
<li><code>12/35 (34.3%)</code> - 分母明示</li>
</ul>
SAPやシェルに従って統一してください。
</div>

<div class="info-box warning">
<div class="info-box-title">⚠️ 数値精度の注意</div>
<ul>
<li>パーセンテージの小数点以下桁数はSAPの指示に従う（通常1桁）</li>
<li>0%や100%の場合の表示ルールを確認する</li>
<li>四捨五入のルールを明確にする（SASのデフォルトはBanker's rounding）</li>
<li>SDの小数点は通常、平均値より1桁多い</li>
</ul>
</div>
`,
            quiz: [
                { id: "q1004_1", type: "choice", question: "PROC TRANSPOSEで転置キー（列名の元になる変数）を指定するステートメントはどれですか？", options: ["BY", "VAR", "ID", "KEY"], answer: 2, explanation: "ID文は転置キーを指定し、その変数の値が新しいデータセットの列名になります。" },
                { id: "q1004_2", type: "choice", question: "PROC MEANSでゼロカウントのカテゴリも出力に含めるためのオプションはどれですか？", options: ["ALLCATS", "COMPLETETYPES", "ZEROFILL", "INCLUDEALL"], answer: 1, explanation: "COMPLETETYPESオプションを使用すると、データに存在しないカテゴリの組み合わせも出力に含められ、n=0のカテゴリも表示できます。" },
                { id: "q1004_3", type: "choice", question: "SASのデフォルトの四捨五入方式は何ですか？", options: ["常に切り上げ", "常に切り捨て", "Banker's rounding（偶数丸め）", "通常の四捨五入"], answer: 2, explanation: "SASのデフォルトはBanker's rounding（偶数丸め）で、0.5の端数を最も近い偶数に丸めます。例えば2.5は2に、3.5は4になります。" },
                { id: "q1004_4", type: "choice", question: "AE（有害事象）の発現率を計算する際、分母として通常使用されるのはどれですか？", options: ["AE発現件数", "全被験者数", "安全性解析対象集団の各投与群被験者数（Big N）", "来院回数"], answer: 2, explanation: "AE発現率のパーセンテージは、安全性解析対象集団（Safety Population）の各投与群の被験者数（Big N）を分母として計算します。" },
                { id: "q1004_5", type: "fill", question: "PROC SQLでクエリ結果をマクロ変数に格納する構文は SELECT ... ___ :変数名 FROM ... です。", answer: "INTO", explanation: "PROC SQLでは SELECT ... INTO :マクロ変数名 FROM ... の構文で、クエリ結果をマクロ変数に格納します。" }
            ]
        }
    ]
};
