/* ============================================
   TLF Academy - Level 6: Tables（表）の基礎
   ============================================ */

const LEVEL6_DATA = {
    id: 6,
    title: "Tables（表）の基礎",
    icon: "📊",
    description: "臨床試験における基本的な表の作成方法と規則を学ぶ",
    modules: [
        {
            id: 601,
            title: "人口統計表（Demographics Table）",
            duration: "25分",
            content: `
<h2>人口統計表（Demographics Table）の概要</h2>
<p>人口統計表は臨床試験の結果報告において最も基本的な表の一つであり、通常<strong>Table 14.1.1</strong>として報告書に含まれます。ADSLデータセットを使用して、試験に参加した被験者の背景情報を投与群ごとに要約します。</p>

<div class="info-box tip">
<div class="info-box-title">💡 ポイント</div>
人口統計表の目的は、各投与群間で被験者背景がバランスよく分布していることを確認し、試験結果の解釈に影響を与える潜在的な交絡因子がないかを評価することです。
</div>

<h3>ADSLの主要変数</h3>
<p>人口統計表で使用するADSLの主要変数は以下の通りです。</p>
<table>
<thead>
<tr><th>変数名</th><th>ラベル</th><th>型</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td>USUBJID</td><td>Unique Subject Identifier</td><td>Char</td><td>被験者識別</td></tr>
<tr><td>TRT01P</td><td>Planned Treatment</td><td>Char</td><td>計画された投与群</td></tr>
<tr><td>TRT01A</td><td>Actual Treatment</td><td>Char</td><td>実際の投与群</td></tr>
<tr><td>AGE</td><td>Age</td><td>Num</td><td>年齢</td></tr>
<tr><td>AGEGR1</td><td>Age Group 1</td><td>Char</td><td>年齢区分（例: &lt;65, ≥65）</td></tr>
<tr><td>SEX</td><td>Sex</td><td>Char</td><td>性別（M/F）</td></tr>
<tr><td>RACE</td><td>Race</td><td>Char</td><td>人種</td></tr>
<tr><td>ETHNIC</td><td>Ethnicity</td><td>Char</td><td>民族</td></tr>
<tr><td>WEIGHTBL</td><td>Baseline Weight</td><td>Num</td><td>ベースライン体重</td></tr>
<tr><td>HEIGHTBL</td><td>Baseline Height</td><td>Num</td><td>ベースライン身長</td></tr>
<tr><td>BMIBL</td><td>Baseline BMI</td><td>Num</td><td>ベースラインBMI</td></tr>
</tbody>
</table>

<h3>連続変数の要約統計量</h3>
<p>年齢、体重、身長などの連続変数は、以下の要約統計量を投与群ごとに表示します。</p>
<table>
<thead>
<tr><th>統計量</th><th>略称</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td>被験者数</td><td>N / n</td><td>非欠測の被験者数</td></tr>
<tr><td>平均値</td><td>Mean</td><td>算術平均</td></tr>
<tr><td>標準偏差</td><td>SD</td><td>標本標準偏差</td></tr>
<tr><td>中央値</td><td>Median</td><td>中央値（50パーセンタイル）</td></tr>
<tr><td>最小値</td><td>Min</td><td>最小値</td></tr>
<tr><td>最大値</td><td>Max</td><td>最大値</td></tr>
</tbody>
</table>

<div class="info-box tip">
<div class="info-box-title">💡 表示形式</div>
<p>連続変数の表示形式の一般的な規則：</p>
<ul>
<li>N: 整数で表示</li>
<li>Mean, Median: 元データの小数点+1桁で表示（例: 年齢が整数なら小数1桁）</li>
<li>SD: 元データの小数点+2桁で表示</li>
<li>Min, Max: 元データと同じ小数桁数で表示</li>
</ul>
</div>

<h3>カテゴリカル変数の要約</h3>
<p>性別、人種などのカテゴリカル変数は、各カテゴリの<strong>頻度（n）</strong>と<strong>割合（%）</strong>を投与群ごとに表示します。</p>
<p>割合の計算は以下の通りです：</p>
<ul>
<li>割合(%) = (カテゴリのn / Big Nの被験者数) × 100</li>
<li>通常、小数1桁で表示（例: 45.3%）</li>
<li>表示形式: n (xx.x%)</li>
</ul>

<h3>人口統計表のレイアウト例</h3>
<table>
<thead>
<tr><th>項目</th><th>Placebo (N=100)</th><th>Drug A (N=102)</th><th>Total (N=202)</th></tr>
</thead>
<tbody>
<tr><td><strong>Age (years)</strong></td><td></td><td></td><td></td></tr>
<tr><td>&nbsp;&nbsp;N</td><td>100</td><td>102</td><td>202</td></tr>
<tr><td>&nbsp;&nbsp;Mean (SD)</td><td>55.3 (12.45)</td><td>54.8 (11.92)</td><td>55.0 (12.17)</td></tr>
<tr><td>&nbsp;&nbsp;Median</td><td>56.0</td><td>55.5</td><td>55.5</td></tr>
<tr><td>&nbsp;&nbsp;Min, Max</td><td>22, 78</td><td>24, 80</td><td>22, 80</td></tr>
<tr><td><strong>Sex, n (%)</strong></td><td></td><td></td><td></td></tr>
<tr><td>&nbsp;&nbsp;Male</td><td>58 (58.0%)</td><td>55 (53.9%)</td><td>113 (55.9%)</td></tr>
<tr><td>&nbsp;&nbsp;Female</td><td>42 (42.0%)</td><td>47 (46.1%)</td><td>89 (44.1%)</td></tr>
</tbody>
</table>

<h3>SASプログラミング例</h3>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* 人口統計表の作成 - 連続変数 */
proc means data=adam.adsl nway noprint;
    where SAFFL = 'Y';
    class TRT01A;
    var AGE WEIGHTBL HEIGHTBL BMIBL;
    output out=cont_stats
        n=n mean=mean std=std median=median min=min max=max;
run;

/* カテゴリカル変数の集計 */
proc freq data=adam.adsl noprint;
    where SAFFL = 'Y';
    tables TRT01A * SEX / outpct out=sex_freq;
run;

/* Big N の取得 */
proc freq data=adam.adsl noprint;
    where SAFFL = 'Y';
    tables TRT01A / out=bign(rename=(count=bign));
run;

/* カテゴリカル変数の割合計算 */
proc sql;
    create table sex_pct as
    select a.TRT01A, a.SEX, a.COUNT as n,
           a.COUNT / b.BIGN * 100 as pct format=5.1
    from sex_freq a
    left join bign b on a.TRT01A = b.TRT01A;
quit;</code></pre>
</div>

<div class="info-box warning">
<div class="info-box-title">⚠️ 注意</div>
<p>人口統計表における注意点：</p>
<ul>
<li>解析対象集団（SAFFL, ITTFL等）を明確に定義すること</li>
<li>Big N（列ヘッダーの被験者数）とsmall n（各セル内の頻度）を区別すること</li>
<li>欠測値がある場合のn（non-missing count）の表示に注意</li>
<li>TRT01P（計画された投与群）とTRT01A（実際の投与群）のどちらを使うか、SAPで確認すること</li>
</ul>
</div>
`,
            quiz: [
                {
                    id: "q601_1",
                    type: "choice",
                    question: "人口統計表で主に使用するADaMデータセットはどれですか？",
                    options: ["ADAE", "ADSL", "ADLB", "ADTTE"],
                    answer: 1,
                    explanation: "人口統計表は被験者レベルの背景情報を要約するため、ADSL（Subject Level Analysis Dataset）を使用します。"
                },
                {
                    id: "q601_2",
                    type: "choice",
                    question: "連続変数の標準偏差（SD）の表示桁数は、一般的にどのように決まりますか？",
                    options: [
                        "元データと同じ小数桁数",
                        "元データの小数点+1桁",
                        "元データの小数点+2桁",
                        "常に小数2桁"
                    ],
                    answer: 2,
                    explanation: "SDは一般的に元データの小数点桁数+2桁で表示します。例えば、年齢が整数であれば小数2桁で表示します。"
                },
                {
                    id: "q601_3",
                    type: "choice",
                    question: "カテゴリカル変数の割合を計算する際の分母として正しいものはどれですか？",
                    options: [
                        "全投与群の合計被験者数",
                        "各投与群のBig N（列ヘッダーの被験者数）",
                        "カテゴリごとの合計人数",
                        "非欠測の被験者数のみ"
                    ],
                    answer: 1,
                    explanation: "カテゴリカル変数の割合は、各投与群のBig N（列ヘッダーに表示される被験者数）を分母として計算します。"
                },
                {
                    id: "q601_4",
                    type: "choice",
                    question: "ADSLにおいてTRT01PとTRT01Aの違いとして正しいものはどれですか？",
                    options: [
                        "TRT01Pは一次治療、TRT01Aは二次治療を示す",
                        "TRT01Pは計画された投与群、TRT01Aは実際の投与群を示す",
                        "TRT01Pはプラセボ群、TRT01Aは実薬群を示す",
                        "TRT01Pは主要解析、TRT01Aは感度解析用を示す"
                    ],
                    answer: 1,
                    explanation: "TRT01Pは「Planned Treatment for Period 01」で計画された投与群、TRT01Aは「Actual Treatment for Period 01」で実際に投与された群を表します。"
                },
                {
                    id: "q601_5",
                    type: "fill",
                    question: "人口統計表の列ヘッダーに表示される全体の被験者数を「Big ___」と呼びます。（アルファベット1文字）",
                    answer: "N",
                    explanation: "列ヘッダーに表示される投与群全体の被験者数をBig N、各セル内のカテゴリごとの頻度をsmall nと呼び区別します。"
                }
            ]
        },
        {
            id: 602,
            title: "ベースライン特性表",
            duration: "25分",
            content: `
<h2>ベースライン特性表の概要</h2>
<p>ベースライン特性表は、被験者の疾患関連背景やベースライン時点の臨床的特徴を要約する表です。人口統計表が一般的な背景情報（年齢、性別等）を扱うのに対し、ベースライン特性表は<strong>疾患特性</strong>、<strong>既往歴</strong>、<strong>併用薬</strong>などのより臨床的な情報を含みます。</p>

<div class="info-box tip">
<div class="info-box-title">💡 ポイント</div>
ベースライン特性表は通常、Table 14.1.2 以降に配置されます。SAP（Statistical Analysis Plan）の定義に従い、どの変数をベースライン特性として報告するかが決定されます。
</div>

<h3>疾患特性の要約</h3>
<p>疾患特性として報告される項目は、試験の対象疾患によって異なりますが、一般的に以下が含まれます。</p>
<table>
<thead>
<tr><th>カテゴリ</th><th>変数例</th><th>データソース</th></tr>
</thead>
<tbody>
<tr><td>疾患歴</td><td>診断からの期間、疾患ステージ</td><td>ADSL</td></tr>
<tr><td>前治療</td><td>前治療レジメン数、前治療の種類</td><td>ADSL / ADCM</td></tr>
<tr><td>バイオマーカー</td><td>腫瘍マーカー値、遺伝子変異</td><td>ADSL / ADLB</td></tr>
<tr><td>病期分類</td><td>TNM分類、Dukes分類</td><td>ADSL</td></tr>
<tr><td>Performance Status</td><td>ECOG PS、Karnofsky Score</td><td>ADSL</td></tr>
</tbody>
</table>

<h3>併用薬の要約</h3>
<p>併用薬の要約表では、ADCMデータセットを使用して、ベースライン時に使用されていた薬剤を集計します。</p>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* 併用薬の要約 - ATC分類レベル2別 */
proc sql;
    create table cm_baseline as
    select distinct a.USUBJID, a.TRT01A,
           b.CMCLAS,   /* ATC Level 2 */
           b.CMDECOD   /* WHO Drug preferred name */
    from adam.adsl a
    inner join adam.adcm b on a.USUBJID = b.USUBJID
    where a.SAFFL = 'Y'
      and b.ONTRTFL ne 'Y'  /* ベースライン時の併用薬 */
      and b.CMENRF = 'BEFORE';
quit;

/* ATC分類別の集計 */
proc freq data=cm_baseline noprint;
    tables TRT01A * CMCLAS / out=cm_freq;
run;</code></pre>
</div>

<h3>既往歴の要約</h3>
<p>既往歴（Medical History）の要約表では、ADMHデータセットまたはSDTMのMHドメインから取得した情報を使用します。SOC（System Organ Class）別およびPT（Preferred Term）別に集計します。</p>

<table>
<thead>
<tr><th>SOC</th><th>Preferred Term</th><th>Placebo (N=100)<br>n (%)</th><th>Drug A (N=102)<br>n (%)</th></tr>
</thead>
<tbody>
<tr><td><strong>心臓障害</strong></td><td></td><td><strong>25 (25.0%)</strong></td><td><strong>28 (27.5%)</strong></td></tr>
<tr><td></td><td>高血圧</td><td>18 (18.0%)</td><td>20 (19.6%)</td></tr>
<tr><td></td><td>狭心症</td><td>5 (5.0%)</td><td>6 (5.9%)</td></tr>
<tr><td></td><td>心房細動</td><td>4 (4.0%)</td><td>3 (2.9%)</td></tr>
<tr><td><strong>代謝および栄養障害</strong></td><td></td><td><strong>32 (32.0%)</strong></td><td><strong>30 (29.4%)</strong></td></tr>
<tr><td></td><td>2型糖尿病</td><td>20 (20.0%)</td><td>18 (17.6%)</td></tr>
<tr><td></td><td>脂質異常症</td><td>15 (15.0%)</td><td>16 (15.7%)</td></tr>
</tbody>
</table>

<h3>連続変数とカテゴリ変数の表示方法</h3>
<p>ベースライン特性表では、変数のタイプによって表示方法が異なります。</p>

<table>
<thead>
<tr><th>変数タイプ</th><th>表示統計量</th><th>表示形式例</th></tr>
</thead>
<tbody>
<tr><td>連続変数</td><td>N, Mean (SD), Median, Min-Max</td><td>55.3 (12.45)</td></tr>
<tr><td>カテゴリ変数</td><td>n (%)</td><td>42 (42.0%)</td></tr>
<tr><td>順序変数</td><td>n (%)、カテゴリ順に表示</td><td>Grade 1: 15 (15.0%)</td></tr>
<tr><td>バイナリ変数</td><td>n (%) の「Yes」のみ表示する場合あり</td><td>18 (18.0%)</td></tr>
</tbody>
</table>

<div class="info-box warning">
<div class="info-box-title">⚠️ 注意</div>
<p>ベースライン特性表で注意すべき点：</p>
<ul>
<li>欠測データの扱い：「Missing」カテゴリを表示するか、脚注で説明するかをSAPで確認</li>
<li>p値の表示：ICH E9ガイドラインでは、ベースライン比較のp値表示は推奨されていない</li>
<li>複数のデータソース（ADSL, ADCM, ADMH）からのデータを統合する際は、解析対象集団の一貫性を確保</li>
</ul>
</div>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* ベースライン特性表 - 連続変数の作成 */
%macro cont_stats(inds=, var=, label=);
    proc means data=&inds nway noprint;
        where SAFFL = 'Y';
        class TRT01A;
        var &var;
        output out=_stats
            n=n mean=mean std=std median=median min=min max=max;
    run;

    data _cont;
        set _stats;
        length col1 $200 category $200;
        category = "&label";
        /* Mean (SD) の表示 */
        col1 = catx(' ', put(mean, 8.1),
                    cats('(', put(std, 8.2), ')'));
    run;
%mend;

%cont_stats(inds=adam.adsl, var=AGE, label=Age (years));
%cont_stats(inds=adam.adsl, var=WEIGHTBL, label=Weight (kg));
%cont_stats(inds=adam.adsl, var=HEIGHTBL, label=Height (cm));</code></pre>
</div>
`,
            quiz: [
                {
                    id: "q602_1",
                    type: "choice",
                    question: "ベースライン特性表と人口統計表の主な違いとして正しいものはどれですか？",
                    options: [
                        "使用するデータセットが異なる",
                        "人口統計表は一般的背景、ベースライン特性表は疾患関連特性を扱う",
                        "ベースライン特性表にはp値が必ず含まれる",
                        "表示する統計量が根本的に異なる"
                    ],
                    answer: 1,
                    explanation: "人口統計表は年齢・性別などの一般的な背景情報を扱い、ベースライン特性表は疾患特性・既往歴・併用薬など臨床的な情報を扱います。"
                },
                {
                    id: "q602_2",
                    type: "choice",
                    question: "既往歴（Medical History）の要約表で一般的に使用される分類体系はどれですか？",
                    options: [
                        "ATC分類",
                        "ICD-10コード",
                        "MedDRA（SOC/PT）",
                        "SNOMED CT"
                    ],
                    answer: 2,
                    explanation: "既往歴の要約表では、MedDRAのSOC（System Organ Class）とPT（Preferred Term）を使用して階層的に集計します。"
                },
                {
                    id: "q602_3",
                    type: "choice",
                    question: "ICH E9ガイドラインにおけるベースライン比較のp値表示に関する推奨事項として正しいものはどれですか？",
                    options: [
                        "すべてのベースライン変数にp値を表示すべき",
                        "p値は0.05未満の場合のみ表示すべき",
                        "ベースライン比較のp値表示は推奨されていない",
                        "連続変数のみp値を表示すべき"
                    ],
                    answer: 2,
                    explanation: "ICH E9ガイドラインでは、無作為化試験においてベースライン特性の投与群間比較のp値を表示することは推奨されていません。無作為化により群間差は偶然によるものであるためです。"
                },
                {
                    id: "q602_4",
                    type: "choice",
                    question: "併用薬の要約で薬剤を分類する際に一般的に使用される辞書はどれですか？",
                    options: [
                        "MedDRA",
                        "CDISC Controlled Terminology",
                        "WHO Drug Dictionary（ATC分類）",
                        "SNOMED CT"
                    ],
                    answer: 2,
                    explanation: "併用薬の分類にはWHO Drug Dictionary（WHODrug）が使用され、ATC（Anatomical Therapeutic Chemical）分類体系で薬剤を階層的に分類します。"
                },
                {
                    id: "q602_5",
                    type: "fill",
                    question: "被験者の全身状態を評価する指標で、0（全く問題なく活動できる）から5（死亡）のスケールを持つものは「_____ PS」です。（アルファベット4文字）",
                    answer: "ECOG",
                    explanation: "ECOG PS（Eastern Cooperative Oncology Group Performance Status）は0〜5のスケールで患者の全身状態を評価します。臨床試験のベースライン特性として頻繁に使用されます。"
                }
            ]
        },
        {
            id: 603,
            title: "安全性要約表の基礎",
            duration: "30分",
            content: `
<h2>安全性要約表の概要</h2>
<p>安全性要約表は臨床試験報告書の中で最も重要な表の一つであり、被験薬の安全性プロファイルを評価するための基礎となります。主に<strong>ADAE</strong>データセットを使用し、<strong>TEAE（Treatment-Emergent Adverse Events）</strong>を中心に集計します。</p>

<div class="info-box tip">
<div class="info-box-title">💡 ポイント</div>
<p>TEAEとは、治験薬の投与開始後に発現した、または投与開始後に悪化した有害事象のことです。ADaEのTRTEMFL（Treatment Emergent Flag）= 'Y' で識別されます。</p>
</div>

<h3>有害事象概要表（Overall Summary of AEs）</h3>
<p>最初に作成する安全性表は、有害事象の全体的な概要を示す表です。</p>

<table>
<thead>
<tr><th>項目</th><th>Placebo (N=100)<br>n (%)</th><th>Drug A (N=102)<br>n (%)</th></tr>
</thead>
<tbody>
<tr><td>TEAEが1件以上発現した被験者</td><td>65 (65.0%)</td><td>72 (70.6%)</td></tr>
<tr><td>治験薬との因果関係が否定できないTEAE</td><td>30 (30.0%)</td><td>45 (44.1%)</td></tr>
<tr><td>Grade 3以上のTEAE</td><td>12 (12.0%)</td><td>15 (14.7%)</td></tr>
<tr><td>重篤な有害事象（SAE）</td><td>8 (8.0%)</td><td>10 (9.8%)</td></tr>
<tr><td>投与中止に至ったTEAE</td><td>5 (5.0%)</td><td>7 (6.9%)</td></tr>
<tr><td>死亡に至ったTEAE</td><td>1 (1.0%)</td><td>2 (2.0%)</td></tr>
</tbody>
</table>

<div class="info-box warning">
<div class="info-box-title">⚠️ 重要な集計ルール</div>
<p>有害事象の集計では以下のルールに注意してください：</p>
<ul>
<li><strong>被験者単位の集計</strong>：同一被験者に同じAEが複数回発現しても、1回としてカウント（被験者単位のユニークカウント）</li>
<li><strong>最悪ケースの原則</strong>：同一被験者で同じPTの重症度が異なる場合、最も重症なグレードでカウント</li>
<li><strong>階層集計</strong>：SOCレベルでも同一被験者を1回のみカウント</li>
</ul>
</div>

<h3>SOC/PT別有害事象集計表</h3>
<p>SOC（System Organ Class）およびPT（Preferred Term）別の有害事象集計は、安全性評価の中核をなす表です。MedDRA辞書を使用して分類します。</p>

<table>
<thead>
<tr><th>SOC / Preferred Term</th><th>Placebo (N=100)<br>n (%)</th><th>Drug A (N=102)<br>n (%)</th></tr>
</thead>
<tbody>
<tr><td><strong>胃腸障害</strong></td><td><strong>20 (20.0%)</strong></td><td><strong>35 (34.3%)</strong></td></tr>
<tr><td>&nbsp;&nbsp;悪心</td><td>12 (12.0%)</td><td>25 (24.5%)</td></tr>
<tr><td>&nbsp;&nbsp;嘔吐</td><td>5 (5.0%)</td><td>15 (14.7%)</td></tr>
<tr><td>&nbsp;&nbsp;下痢</td><td>8 (8.0%)</td><td>10 (9.8%)</td></tr>
<tr><td><strong>神経系障害</strong></td><td><strong>15 (15.0%)</strong></td><td><strong>20 (19.6%)</strong></td></tr>
<tr><td>&nbsp;&nbsp;頭痛</td><td>10 (10.0%)</td><td>15 (14.7%)</td></tr>
<tr><td>&nbsp;&nbsp;浮動性めまい</td><td>6 (6.0%)</td><td>8 (7.8%)</td></tr>
</tbody>
</table>

<h3>重症度別の集計</h3>
<p>CTCAEグレードまたは治験依頼者定義の重症度分類に基づいて集計します。</p>

<table>
<thead>
<tr><th>グレード</th><th>定義</th><th>ADaEでの変数</th></tr>
</thead>
<tbody>
<tr><td>Grade 1</td><td>軽度</td><td>AESEV='MILD' or ATOXGR='1'</td></tr>
<tr><td>Grade 2</td><td>中等度</td><td>AESEV='MODERATE' or ATOXGR='2'</td></tr>
<tr><td>Grade 3</td><td>重度</td><td>AESEV='SEVERE' or ATOXGR='3'</td></tr>
<tr><td>Grade 4</td><td>生命を脅かす</td><td>ATOXGR='4'</td></tr>
<tr><td>Grade 5</td><td>死亡</td><td>ATOXGR='5'</td></tr>
</tbody>
</table>

<h3>因果関係別の集計</h3>
<p>治験薬との因果関係（AEREL変数）に基づく集計も重要です。</p>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* TEAE Summary Table - SOC/PT別 */
/* Step 1: 被験者単位のユニークレコード作成 */
proc sort data=adam.adae out=ae_teae nodupkey;
    where SAFFL = 'Y' and TRTEMFL = 'Y';
    by USUBJID AEBODSYS AEDECOD;
run;

/* Step 2: SOCレベルの集計 */
proc freq data=ae_teae noprint;
    tables TRT01A * AEBODSYS / out=soc_freq;
run;

/* Step 3: PTレベルの集計 */
proc freq data=ae_teae noprint;
    tables TRT01A * AEBODSYS * AEDECOD / out=pt_freq;
run;

/* Step 4: Big N と割合の計算 */
proc sql;
    create table ae_summary as
    select a.TRT01A, a.AEBODSYS, a.AEDECOD,
           a.COUNT as n,
           a.COUNT / b.BIGN * 100 as pct format=5.1
    from pt_freq a
    left join bign b on a.TRT01A = b.TRT01A
    order by a.AEBODSYS, a.AEDECOD, a.TRT01A;
quit;

/* 因果関係別のフィルタリング */
data ae_related;
    set adam.adae;
    where SAFFL = 'Y' and TRTEMFL = 'Y'
      and AEREL in ('POSSIBLE', 'PROBABLE', 'DEFINITE');
run;</code></pre>
</div>

<div class="info-box tip">
<div class="info-box-title">💡 ソート順</div>
<p>SOC/PT別の表のソート順は以下のいずれかが使用されます：</p>
<ul>
<li><strong>国際ソート順</strong>：MedDRA SOCの国際的な標準ソート順</li>
<li><strong>頻度順</strong>：実薬群の発現頻度の高い順（最も一般的）</li>
<li><strong>アルファベット順</strong>：SOC、PT共にアルファベット順</li>
</ul>
</div>
`,
            quiz: [
                {
                    id: "q603_1",
                    type: "choice",
                    question: "TEAEの定義として正しいものはどれですか？",
                    options: [
                        "すべての有害事象",
                        "治験薬投与開始後に発現または悪化した有害事象",
                        "治験薬との因果関係がある有害事象のみ",
                        "Grade 3以上の重篤な有害事象のみ"
                    ],
                    answer: 1,
                    explanation: "TEAE（Treatment-Emergent Adverse Event）は、治験薬の投与開始後に新たに発現した、または投与開始前から存在していたが投与開始後に悪化した有害事象です。"
                },
                {
                    id: "q603_2",
                    type: "choice",
                    question: "同一被験者に同じPTの有害事象が3回発現した場合、SOC/PT別集計表での集計方法として正しいものはどれですか？",
                    options: [
                        "3件としてカウントする",
                        "1件（被験者単位でユニーク）としてカウントする",
                        "最初の1件のみカウントする",
                        "最も重症な1件のみカウントする"
                    ],
                    answer: 1,
                    explanation: "有害事象の集計は被験者単位のユニークカウントが基本です。同一被験者に同じPTが複数回発現しても、その被験者を1回としてカウントします。"
                },
                {
                    id: "q603_3",
                    type: "choice",
                    question: "ADaEでTEAEを識別するためのフラグ変数はどれですか？",
                    options: [
                        "AESER",
                        "SAFFL",
                        "TRTEMFL",
                        "AEREL"
                    ],
                    answer: 2,
                    explanation: "TRTEMFL（Treatment Emergent Flag）は、ADaEにおいてTEAEを識別するためのフラグ変数です。'Y'の場合、そのAEはTEAEであることを示します。"
                },
                {
                    id: "q603_4",
                    type: "choice",
                    question: "SOC/PT別有害事象集計表で最も一般的に使用されるソート順はどれですか？",
                    options: [
                        "アルファベット順",
                        "MedDRA国際ソート順",
                        "実薬群の発現頻度の高い順",
                        "発現時期の早い順"
                    ],
                    answer: 2,
                    explanation: "SOC/PT別の有害事象集計表では、実薬群の発現頻度の高い順（降順）が最も一般的に使用されます。これにより、臨床的に重要なAEが上部に表示されます。"
                },
                {
                    id: "q603_5",
                    type: "fill",
                    question: "有害事象の分類に使用される国際的な医学用語辞書の名称は「_____」です。（アルファベット6文字）",
                    answer: "MedDRA",
                    explanation: "MedDRA（Medical Dictionary for Regulatory Activities）は、有害事象の分類に使用される国際的な標準医学用語辞書です。SOC、HLGT、HLT、PT、LLTの5階層構造を持ちます。"
                }
            ]
        },
        {
            id: 604,
            title: "表のフォーマット規則",
            duration: "25分",
            content: `
<h2>表のフォーマット規則</h2>
<p>臨床試験の表は、規制当局への提出や医学的レビューに使用されるため、厳格なフォーマット規則に従う必要があります。ここでは、ヘッダー構造、Big N/small n、脚注、インデント、RTF/PDFレイアウトについて解説します。</p>

<h3>ヘッダー構造</h3>
<p>表のヘッダーは以下の要素で構成されます。</p>

<table>
<thead>
<tr><th>要素</th><th>内容</th><th>位置</th></tr>
</thead>
<tbody>
<tr><td>プログラム番号</td><td>Output ID（例: Table 14.1.1）</td><td>左上</td></tr>
<tr><td>表タイトル</td><td>表の内容を説明するタイトル</td><td>中央上</td></tr>
<tr><td>対象集団</td><td>解析対象集団名（例: Safety Population）</td><td>タイトル下</td></tr>
<tr><td>列ヘッダー</td><td>投与群名 + Big N</td><td>表本体の直上</td></tr>
</tbody>
</table>

<div class="info-box tip">
<div class="info-box-title">💡 タイトルの書き方</div>
<p>表タイトルのベストプラクティス：</p>
<ul>
<li>何を（What）：要約している内容を明記</li>
<li>誰を（Who）：対象集団を明記</li>
<li>例: "Summary of Demographics and Baseline Characteristics - Safety Population"</li>
</ul>
</div>

<h3>Big N と small n の使い分け</h3>
<p>臨床試験の表では、NとnはそれぞれKOLによって区別されます。</p>

<table>
<thead>
<tr><th>表記</th><th>意味</th><th>使用場所</th></tr>
</thead>
<tbody>
<tr><td><strong>Big N</strong></td><td>投与群の全被験者数</td><td>列ヘッダー（例: Placebo (N=100)）</td></tr>
<tr><td><strong>small n</strong></td><td>特定カテゴリの被験者数</td><td>表のセル内（例: 42 (42.0%)）</td></tr>
<tr><td><strong>n（連続変数）</strong></td><td>非欠測の被験者数</td><td>要約統計量の行（例: n=98）</td></tr>
</tbody>
</table>

<div class="info-box warning">
<div class="info-box-title">⚠️ 注意</div>
Big Nとsmall nの不一致は監査で指摘される頻出項目です。例えば、欠測がある場合、連続変数のnとBig Nが異なることがあり、その場合は脚注で説明が必要です。
</div>

<h3>脚注（Footnotes）の規則</h3>
<p>脚注は表の補足情報を提供する重要な要素です。</p>
<ol>
<li><strong>データソース</strong>：使用したデータセット名（例: Source: ADSL）</li>
<li><strong>対象集団の定義</strong>：解析対象集団の定義（例: Safety population includes all randomized subjects who received at least one dose of study drug）</li>
<li><strong>統計量の説明</strong>：特殊な統計手法や計算方法の注記</li>
<li><strong>略語の定義</strong>：表内で使用した略語の定義</li>
<li><strong>プログラム情報</strong>：生成プログラム名、実行日時</li>
</ol>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* PROC REPORT を使用した表のフォーマット */
title1 "Table 14.1.1";
title2 "Summary of Demographics";
title3 "Safety Population";

proc report data=final nowd split='~'
    style(report)=[outputwidth=9.5in]
    style(header)=[font_weight=bold backgroundcolor=white];

    column category stat_label trt1 trt2 trt3;

    define category / order order=data
        "Parameter" style(column)=[cellwidth=2.5in];
    define stat_label / display
        "Statistic" style(column)=[cellwidth=1.2in];
    define trt1 / display
        "Placebo~(N=100)" style(column)=[cellwidth=1.5in just=c];
    define trt2 / display
        "Drug A~(N=102)" style(column)=[cellwidth=1.5in just=c];
    define trt3 / display
        "Total~(N=202)" style(column)=[cellwidth=1.5in just=c];

    compute after / style=[font_size=8pt];
        line @1 "Source: ADSL";
        line @1 "Note: Percentages are based on N.";
        line @1 "Program: t_14_1_1.sas  &sysdate9.";
    endcomp;
run;</code></pre>
</div>

<h3>インデント規則</h3>
<p>表内のインデントは、情報の階層構造を視覚的に表現するために使用します。</p>
<ul>
<li><strong>レベル0</strong>：パラメータ名（例: Age (years)）- インデントなし、太字</li>
<li><strong>レベル1</strong>：統計量（例: Mean (SD)）- 2〜3スペースのインデント</li>
<li><strong>レベル2</strong>：サブカテゴリ（例: &lt;65）- 4〜6スペースのインデント</li>
</ul>

<h3>RTF/PDFレイアウト</h3>
<p>最終出力のフォーマットに関する主要な規則を以下に示します。</p>

<table>
<thead>
<tr><th>項目</th><th>RTF</th><th>PDF</th></tr>
</thead>
<tbody>
<tr><td>フォント</td><td>Courier New 9pt</td><td>Courier New 8-9pt</td></tr>
<tr><td>用紙サイズ</td><td>Letter / A4</td><td>Letter / A4</td></tr>
<tr><td>向き</td><td>縦（Portrait）/ 横（Landscape）</td><td>同左</td></tr>
<tr><td>マージン</td><td>上下左右 1inch</td><td>同左</td></tr>
<tr><td>改ページ</td><td>ODS RTF startpage=yes</td><td>ODS PDF startpage=yes</td></tr>
</tbody>
</table>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* RTF出力の設定例 */
options nodate nonumber orientation=landscape;

ods escapechar='^';
ods rtf file="t_14_1_1.rtf"
    style=TLFstyle
    bodytitle;

/* フォント設定 */
ods rtf style(body)=[font_face='Courier New' font_size=9pt];

/* ... PROC REPORT ... */

ods rtf close;

/* PDF出力の設定例 */
ods pdf file="t_14_1_1.pdf"
    style=TLFstyle
    notoc;

/* ... PROC REPORT ... */

ods pdf close;</code></pre>
</div>

<div class="info-box tip">
<div class="info-box-title">💡 品質チェックポイント</div>
<ul>
<li>すべての表で一貫したフォーマットを使用しているか</li>
<li>Big Nが正しい解析対象集団に基づいているか</li>
<li>脚注が必要な情報をすべてカバーしているか</li>
<li>ページネーション（改ページ）が適切か</li>
<li>列幅がデータの表示に十分か</li>
</ul>
</div>
`,
            quiz: [
                {
                    id: "q604_1",
                    type: "choice",
                    question: "表のヘッダーに表示される「Big N」が表すものとして正しいものはどれですか？",
                    options: [
                        "全体の被験者数",
                        "各投与群の全被験者数",
                        "特定カテゴリの被験者数",
                        "非欠測の被験者数"
                    ],
                    answer: 1,
                    explanation: "Big Nは列ヘッダーに表示され、各投与群の全被験者数を示します。例えば「Placebo (N=100)」のように表示されます。"
                },
                {
                    id: "q604_2",
                    type: "choice",
                    question: "臨床試験の表の脚注に含めるべきでない情報はどれですか？",
                    options: [
                        "データソース（使用データセット名）",
                        "解析対象集団の定義",
                        "個々の被験者の詳細データ",
                        "使用した略語の定義"
                    ],
                    answer: 2,
                    explanation: "脚注には一般的な注記やメタ情報を記載します。個々の被験者の詳細データは脚注ではなく、リスティング等で別途報告します。"
                },
                {
                    id: "q604_3",
                    type: "choice",
                    question: "RTF/PDF出力で最も一般的に使用されるフォントはどれですか？",
                    options: [
                        "Times New Roman",
                        "Arial",
                        "Courier New",
                        "Calibri"
                    ],
                    answer: 2,
                    explanation: "臨床試験の表出力では、等幅フォントであるCourier Newが最も一般的に使用されます。等幅フォントにより、数値の桁揃えが容易になります。"
                },
                {
                    id: "q604_4",
                    type: "choice",
                    question: "SASでRTF出力を生成する際に使用するODSステートメントはどれですか？",
                    options: [
                        "ODS HTML",
                        "ODS RTF",
                        "ODS LISTING",
                        "ODS OUTPUT"
                    ],
                    answer: 1,
                    explanation: "ODS RTFステートメントを使用してRTF形式の出力を生成します。file=でファイル名、style=でスタイル、bodytitleでタイトルの配置を指定します。"
                },
                {
                    id: "q604_5",
                    type: "fill",
                    question: "SASのPROC REPORTで列ヘッダーを改行するために使用する区切り文字を指定するオプションは「_____」です。（アルファベット5文字、=を含む）",
                    answer: "split",
                    explanation: "PROC REPORTのsplit=オプションで列ヘッダーの改行文字を指定します。例えばsplit='~'とすると、列ヘッダー内の'~'の位置で改行されます。"
                }
            ]
        }
    ]
};
