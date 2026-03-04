/* ============================================
   TLF Academy - Level 8: Listings（リスト）の作成
   ============================================ */

const LEVEL8_DATA = {
    id: 8,
    title: "Listings（リスト）の作成",
    icon: "📋",
    description: "被験者別のリスティング作成方法と実践的なテクニックを学ぶ",
    modules: [
        {
            id: 801,
            title: "リスティングの基礎",
            duration: "25分",
            content: `
<h2>リスティング（Listing）の基礎</h2>
<p>リスティングは、個々の被験者レベルの詳細データを一覧形式で表示する出力物です。要約表（Table）が集約された統計量を示すのに対し、リスティングは<strong>個別の生データ</strong>を確認するために使用されます。</p>

<div class="info-box tip">
<div class="info-box-title">💡 ポイント</div>
<p>リスティングの主な目的：</p>
<ul>
<li>データの品質確認・検証</li>
<li>個別被験者の臨床経過の追跡（Patient Profile）</li>
<li>異常値やシグナルの詳細調査</li>
<li>規制当局レビュアーによる個別データの確認</li>
</ul>
</div>

<h3>リスティングとテーブルの違い</h3>
<table>
<thead>
<tr><th>特徴</th><th>Table（表）</th><th>Listing（リスト）</th></tr>
</thead>
<tbody>
<tr><td>データレベル</td><td>集約（要約統計量）</td><td>個別（被験者レベル）</td></tr>
<tr><td>主な用途</td><td>結果の報告・評価</td><td>データの確認・検証</td></tr>
<tr><td>CSRでの配置</td><td>Section 14.1-14.3</td><td>Section 16.2</td></tr>
<tr><td>出力形式</td><td>RTF/PDF</td><td>RTF/PDF/SAS Dataset</td></tr>
<tr><td>ページ方向</td><td>多くはPortrait</td><td>多くはLandscape</td></tr>
</tbody>
</table>

<h3>ページネーション</h3>
<p>リスティングは大量のデータを含むため、適切なページネーション（改ページ）が不可欠です。</p>
<ul>
<li><strong>BY変数による改ページ</strong>：被験者ごと、投与群ごとに改ページ</li>
<li><strong>列ヘッダーの繰り返し</strong>：各ページに列ヘッダーを表示</li>
<li><strong>ページ番号</strong>：「Page x of y」形式で表示</li>
<li><strong>被験者IDの繰り返し</strong>：各ページで被験者IDを参照可能にする</li>
</ul>

<h3>BY変数とソート順</h3>
<p>リスティングのソート順は、データの論理的な構造に従って設定します。</p>

<table>
<thead>
<tr><th>リスティング種類</th><th>典型的なソート順</th></tr>
</thead>
<tbody>
<tr><td>有害事象リスト</td><td>USUBJID, AESTDTC, AESEQ</td></tr>
<tr><td>検査値リスト</td><td>USUBJID, PARAMCD, AVISITN, ADT</td></tr>
<tr><td>併用薬リスト</td><td>USUBJID, CMSTDTC, CMSEQ</td></tr>
<tr><td>バイタルサインリスト</td><td>USUBJID, PARAMCD, AVISITN, ATPTN</td></tr>
</tbody>
</table>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* リスティングの基本構造 - PROC REPORT */
options nodate nonumber orientation=landscape;

ods escapechar='^';
ods rtf file="l_16_2_1.rtf" style=TLFstyle bodytitle;

title1 "Listing 16.2.1";
title2 "Listing of Adverse Events";
title3 "Safety Population";

proc report data=ae_listing nowd split='~'
    style(report)=[outputwidth=9.5in]
    style(column)=[font_size=8pt vjust=top];

    column USUBJID TRT01A AEDECOD AEBODSYS
           AESTDTC AEENDTC AESEV AESER AEREL AEACN AEOUT;

    define USUBJID / order order=data
        "Subject~ID" style(column)=[cellwidth=1.0in];
    define TRT01A / order order=data
        "Treatment" style(column)=[cellwidth=0.8in];
    define AEDECOD / display
        "Preferred~Term" style(column)=[cellwidth=1.2in];
    define AEBODSYS / display
        "System Organ~Class" style(column)=[cellwidth=1.2in];
    define AESTDTC / display
        "Start~Date" style(column)=[cellwidth=0.8in];
    define AEENDTC / display
        "End~Date" style(column)=[cellwidth=0.8in];
    define AESEV / display
        "Severity" style(column)=[cellwidth=0.7in];
    define AESER / display
        "Serious" style(column)=[cellwidth=0.5in];
    define AEREL / display
        "Relationship" style(column)=[cellwidth=0.8in];
    define AEACN / display
        "Action~Taken" style(column)=[cellwidth=0.8in];
    define AEOUT / display
        "Outcome" style(column)=[cellwidth=0.8in];

    /* 被験者ごとに改ページ */
    break after USUBJID / page;

    compute after / style=[font_size=7pt];
        line @1 "Source: ADAE";
        line @1 "Program: l_16_2_1.sas";
    endcomp;
run;

ods rtf close;</code></pre>
</div>

<div class="info-box warning">
<div class="info-box-title">⚠️ リスティング作成の注意点</div>
<ul>
<li>被験者IDの匿名化が必要な場合がある（提出先による）</li>
<li>日付の表示形式は一貫性を保つ（例: DD-MMM-YYYY）</li>
<li>欠測データの表示方法を統一（空白、"—"、"N/A" 等）</li>
<li>Landscape形式での列幅の最適化が重要</li>
</ul>
</div>

<h3>Patient Profile</h3>
<p>Patient Profileは、特定の被験者の全臨床データを統合した包括的なリスティングです。安全性レビューや症例検討に使用されます。</p>
<ul>
<li>人口統計情報</li>
<li>投与履歴</li>
<li>有害事象の時系列</li>
<li>検査値の推移</li>
<li>バイタルサインの推移</li>
<li>併用薬の使用状況</li>
</ul>
`,
            quiz: [
                {
                    id: "q801_1",
                    type: "choice",
                    question: "リスティングがCSR（Clinical Study Report）で配置されるセクションはどれですか？",
                    options: [
                        "Section 14.1",
                        "Section 14.2",
                        "Section 14.3",
                        "Section 16.2"
                    ],
                    answer: 3,
                    explanation: "リスティングはCSRのSection 16.2に配置されます。Section 14.1-14.3は要約表（Tables）が配置されるセクションです。"
                },
                {
                    id: "q801_2",
                    type: "choice",
                    question: "リスティングとテーブルの最も基本的な違いはどれですか？",
                    options: [
                        "使用するプログラミング言語が異なる",
                        "リスティングは個別データ、テーブルは集約データを表示する",
                        "リスティングはPDFのみ、テーブルはRTFのみ出力される",
                        "リスティングはPortrait、テーブルはLandscapeで出力される"
                    ],
                    answer: 1,
                    explanation: "リスティングは個々の被験者レベルの詳細データ（生データ）を表示し、テーブルは集約された要約統計量を表示します。"
                },
                {
                    id: "q801_3",
                    type: "choice",
                    question: "リスティングで被験者ごとに改ページするSAS PROC REPORTのステートメントはどれですか？",
                    options: [
                        "compute after USUBJID / page;",
                        "break after USUBJID / page;",
                        "where new USUBJID / page;",
                        "by USUBJID / page;"
                    ],
                    answer: 1,
                    explanation: "PROC REPORTでは「break after USUBJID / page;」で被験者ごとに改ページを設定します。"
                },
                {
                    id: "q801_4",
                    type: "choice",
                    question: "Patient Profileの主な用途として正しいものはどれですか？",
                    options: [
                        "統計解析の実行",
                        "安全性レビューや症例検討",
                        "データベースのバリデーション",
                        "薬物動態モデリング"
                    ],
                    answer: 1,
                    explanation: "Patient Profileは特定の被験者の全臨床データを統合した包括的なリスティングで、安全性レビューや症例検討に使用されます。"
                },
                {
                    id: "q801_5",
                    type: "fill",
                    question: "リスティングの出力は通常、横長レイアウトで出力されます。この向きを英語で「_____」と呼びます。（アルファベット9文字）",
                    answer: "Landscape",
                    explanation: "Landscape（横長）レイアウトはリスティングで一般的に使用されます。多くの列を含むリスティングでは、Portrait（縦長）よりLandscapeの方がデータを表示しやすいためです。"
                }
            ]
        },
        {
            id: 802,
            title: "有害事象リスト",
            duration: "25分",
            content: `
<h2>有害事象リスティングの作成</h2>
<p>有害事象リスティングは、個々の被験者に発現した有害事象の詳細情報を一覧表示する出力物です。ADAEデータセットを使用し、複数のバリエーションが作成されます。</p>

<h3>有害事象リスティングの種類</h3>
<table>
<thead>
<tr><th>リスティング</th><th>対象データ</th><th>フィルター条件</th></tr>
</thead>
<tbody>
<tr><td>全TEAE一覧</td><td>すべてのTEAE</td><td>TRTEMFL = 'Y'</td></tr>
<tr><td>SAE一覧</td><td>重篤な有害事象</td><td>AESER = 'Y'</td></tr>
<tr><td>投与中止に至ったAE</td><td>投与中止AE</td><td>AEACN = 'DRUG WITHDRAWN'</td></tr>
<tr><td>AESI一覧</td><td>特別な関心のあるAE</td><td>カスタムフラグ（例: CQ01NAM）</td></tr>
<tr><td>死亡一覧</td><td>死亡に至ったAE</td><td>AEOUT = 'FATAL' or AESDTH = 'Y'</td></tr>
</tbody>
</table>

<div class="info-box tip">
<div class="info-box-title">💡 ポイント</div>
AESI（Adverse Events of Special Interest）は、被験薬の薬理学的特性や同クラスの薬剤で既知のリスクに基づいて事前に定義された注目すべき有害事象です。
</div>

<h3>全TEAE一覧の表示項目</h3>
<p>被験者別のTEAE一覧に含める項目は以下の通りです。</p>

<table>
<thead>
<tr><th>表示項目</th><th>ADAE変数</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td>被験者ID</td><td>SUBJID / USUBJID</td><td>被験者識別子</td></tr>
<tr><td>投与群</td><td>TRT01A</td><td>実際の投与群</td></tr>
<tr><td>SOC</td><td>AEBODSYS</td><td>器官別大分類</td></tr>
<tr><td>Preferred Term</td><td>AEDECOD</td><td>基本語</td></tr>
<tr><td>Verbatim Term</td><td>AETERM</td><td>報告用語（原文）</td></tr>
<tr><td>発現日</td><td>AESTDTC / ASTDT</td><td>有害事象の発現日</td></tr>
<tr><td>消失日</td><td>AEENDTC / AENDT</td><td>有害事象の消失日</td></tr>
<tr><td>持続期間</td><td>AEDUR（派生）</td><td>発現から消失までの日数</td></tr>
<tr><td>重症度</td><td>AESEV / ATOXGR</td><td>軽度/中等度/重度、またはGrade</td></tr>
<tr><td>因果関係</td><td>AEREL</td><td>治験薬との因果関係</td></tr>
<tr><td>重篤性</td><td>AESER</td><td>重篤な有害事象かどうか</td></tr>
<tr><td>処置</td><td>AEACN</td><td>治験薬に対する処置</td></tr>
<tr><td>転帰</td><td>AEOUT</td><td>有害事象の転帰</td></tr>
</tbody>
</table>

<h3>SAE（重篤な有害事象）リスティング</h3>
<p>SAEリスティングでは、通常のAE項目に加えて以下の追加情報を含めます。</p>
<ul>
<li><strong>重篤性の基準</strong>：入院、死亡、生命の危機、障害、先天異常、重要な医学的事象</li>
<li><strong>SAE報告日</strong>：規制当局への報告日</li>
<li><strong>ナラティブ番号</strong>：CSR Appendixのナラティブへの参照</li>
</ul>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* SAEリスティングの作成 */
data sae_listing;
    set adam.adae;
    where SAFFL = 'Y' and AESER = 'Y';

    /* 持続期間の計算 */
    if nmiss(ASTDT, AENDT) = 0 then
        duration = AENDT - ASTDT + 1;

    /* 日付の表示形式 */
    length start_dt end_dt $11;
    if ASTDT ne . then start_dt = put(ASTDT, date9.);
    else start_dt = '';
    if AENDT ne . then end_dt = put(AENDT, date9.);
    else end_dt = 'Ongoing';

    /* 重篤性基準のフラグ */
    length serious_criteria $200;
    serious_criteria = '';
    if AESDTH = 'Y' then
        serious_criteria = catx(', ', serious_criteria, 'Death');
    if AESLIFE = 'Y' then
        serious_criteria = catx(', ', serious_criteria, 'Life-threatening');
    if AESHOSP = 'Y' then
        serious_criteria = catx(', ', serious_criteria, 'Hospitalization');
    if AESDISAB = 'Y' then
        serious_criteria = catx(', ', serious_criteria, 'Disability');
    if AESCONG = 'Y' then
        serious_criteria = catx(', ', serious_criteria, 'Congenital anomaly');
    if AESMIE = 'Y' then
        serious_criteria = catx(', ', serious_criteria,
                               'Important medical event');
run;

proc sort data=sae_listing;
    by USUBJID ASTDT AESEQ;
run;

/* PROC REPORT でSAEリスティング出力 */
proc report data=sae_listing nowd split='~'
    style(column)=[font_size=7pt vjust=top];

    column SUBJID TRT01A AEDECOD AEBODSYS
           start_dt end_dt duration AESEV AEREL
           serious_criteria AEACN AEOUT;

    define SUBJID / order "Subject~ID"
        style(column)=[cellwidth=0.7in];
    define TRT01A / order "Treatment"
        style(column)=[cellwidth=0.7in];
    define AEDECOD / display "Preferred~Term"
        style(column)=[cellwidth=1.0in];
    define AEBODSYS / display "SOC"
        style(column)=[cellwidth=1.0in];
    define start_dt / display "Start~Date"
        style(column)=[cellwidth=0.7in];
    define end_dt / display "End~Date"
        style(column)=[cellwidth=0.7in];
    define duration / display "Duration~(days)"
        style(column)=[cellwidth=0.5in just=c];
    define AESEV / display "Severity"
        style(column)=[cellwidth=0.6in];
    define AEREL / display "Relationship"
        style(column)=[cellwidth=0.7in];
    define serious_criteria / display "Seriousness~Criteria"
        style(column)=[cellwidth=1.2in];
    define AEACN / display "Action~Taken"
        style(column)=[cellwidth=0.7in];
    define AEOUT / display "Outcome"
        style(column)=[cellwidth=0.7in];

    break after SUBJID / page;
run;</code></pre>
</div>

<div class="info-box warning">
<div class="info-box-title">⚠️ 日付の不完全データ</div>
<p>有害事象の日付が不完全（部分的に欠測）の場合の対処：</p>
<ul>
<li>SDTMでは不完全日付をISO 8601形式で保存（例: 2024-03、2024）</li>
<li>ADaMでは不完全日付のimputationルールをSAPで定義</li>
<li>リスティングでは、imputeされた日付にフラグを付ける（例: 脚注参照マーク）</li>
</ul>
</div>
`,
            quiz: [
                {
                    id: "q802_1",
                    type: "choice",
                    question: "SAE（Serious Adverse Event）の重篤性基準に含まれないものはどれですか？",
                    options: [
                        "死亡",
                        "入院または入院期間の延長",
                        "Grade 3以上の重症度",
                        "先天異常"
                    ],
                    answer: 2,
                    explanation: "SAEの重篤性基準は、死亡、生命の危機、入院、障害、先天異常、重要な医学的事象です。重症度（Grade 3以上）は重篤性の基準とは異なる概念です。"
                },
                {
                    id: "q802_2",
                    type: "choice",
                    question: "ADAEにおいてSAEを識別する変数はどれですか？",
                    options: [
                        "AESEV",
                        "AESER",
                        "AESDTH",
                        "AEREL"
                    ],
                    answer: 1,
                    explanation: "AESER（Serious Event）はSAEを識別するフラグ変数で、'Y'の場合そのAEが重篤であることを示します。AESEVは重症度、AESDTHは死亡フラグです。"
                },
                {
                    id: "q802_3",
                    type: "choice",
                    question: "AESI（Adverse Events of Special Interest）はどのように定義されますか？",
                    options: [
                        "すべてのGrade 3以上の有害事象",
                        "治験薬との因果関係がある有害事象",
                        "被験薬の薬理学的特性等に基づいて事前に定義された有害事象",
                        "投与中止に至った有害事象"
                    ],
                    answer: 2,
                    explanation: "AESIは被験薬の薬理学的特性や同クラスの薬剤で既知のリスクに基づいて、試験開始前に事前定義された注目すべき有害事象です。"
                },
                {
                    id: "q802_4",
                    type: "choice",
                    question: "有害事象リスティングのソート順として最も一般的な組み合わせはどれですか？",
                    options: [
                        "AEBODSYS, AEDECOD, USUBJID",
                        "USUBJID, AESTDTC, AESEQ",
                        "TRT01A, AESEV, AEDECOD",
                        "AEREL, AESER, USUBJID"
                    ],
                    answer: 1,
                    explanation: "有害事象リスティングは通常USUBJID（被験者ID）、AESTDTC（発現日）、AESEQ（シーケンス番号）の順でソートし、被験者ごとに時系列で表示します。"
                },
                {
                    id: "q802_5",
                    type: "fill",
                    question: "投与中止に至った有害事象のリスティングで使用するADAEのフィルター条件は AEACN = 'DRUG _____' です。（アルファベット9文字）",
                    answer: "WITHDRAWN",
                    explanation: "AEACN（Action Taken with Study Treatment）= 'DRUG WITHDRAWN' は、有害事象により治験薬の投与が中止されたことを示します。"
                }
            ]
        },
        {
            id: 803,
            title: "検査値・バイタルサインリスト",
            duration: "25分",
            content: `
<h2>検査値・バイタルサインリスティング</h2>
<p>検査値およびバイタルサインのリスティングは、個々の被験者の測定値を時系列で一覧表示します。異常値のフラグ付けや欠測データの扱いが重要な要素となります。</p>

<h3>検査値リスティングの表示項目</h3>
<table>
<thead>
<tr><th>表示項目</th><th>ADLB変数</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td>被験者ID</td><td>SUBJID</td><td>被験者識別子</td></tr>
<tr><td>投与群</td><td>TRT01A</td><td>実際の投与群</td></tr>
<tr><td>検査項目</td><td>PARAM</td><td>検査パラメータ名</td></tr>
<tr><td>Visit</td><td>AVISIT</td><td>解析Visit名</td></tr>
<tr><td>測定日</td><td>ADT</td><td>測定日</td></tr>
<tr><td>実測値</td><td>AVAL</td><td>解析値</td></tr>
<tr><td>単位</td><td>AVALU</td><td>解析値の単位</td></tr>
<tr><td>基準値下限</td><td>A1LO</td><td>正常範囲の下限値</td></tr>
<tr><td>基準値上限</td><td>A1HI</td><td>正常範囲の上限値</td></tr>
<tr><td>基準値範囲判定</td><td>ANRIND</td><td>LOW / NORMAL / HIGH</td></tr>
<tr><td>ベースライン値</td><td>BASE</td><td>ベースラインの値</td></tr>
<tr><td>変化量</td><td>CHG</td><td>ベースラインからの変化量</td></tr>
</tbody>
</table>

<h3>異常値フラグの表示方法</h3>
<p>基準値範囲外の検査値には視覚的なフラグを付けて、レビュアーの注意を引きます。</p>

<div class="info-box tip">
<div class="info-box-title">💡 異常値フラグの表示規則</div>
<ul>
<li><strong>H</strong>：基準値上限超過（High）</li>
<li><strong>L</strong>：基準値下限未満（Low）</li>
<li><strong>HH</strong> または <strong>H*</strong>：臨床的に重要な高値（Clinically Significant High）</li>
<li><strong>LL</strong> または <strong>L*</strong>：臨床的に重要な低値（Clinically Significant Low）</li>
</ul>
</div>

<h3>検査値リスティングのレイアウト例</h3>
<table>
<thead>
<tr><th>Subject</th><th>Parameter</th><th>Visit</th><th>Date</th><th>Result</th><th>Unit</th><th>Range</th><th>Flag</th><th>BL</th><th>CHG</th></tr>
</thead>
<tbody>
<tr><td>001-001</td><td>ALT</td><td>Baseline</td><td>15JAN2024</td><td>22.0</td><td>U/L</td><td>7-56</td><td></td><td>22.0</td><td></td></tr>
<tr><td>001-001</td><td>ALT</td><td>Week 4</td><td>12FEB2024</td><td>45.0</td><td>U/L</td><td>7-56</td><td></td><td>22.0</td><td>23.0</td></tr>
<tr><td>001-001</td><td>ALT</td><td>Week 8</td><td>11MAR2024</td><td>68.0</td><td>U/L</td><td>7-56</td><td>H</td><td>22.0</td><td>46.0</td></tr>
<tr><td>001-001</td><td>ALT</td><td>Week 12</td><td>08APR2024</td><td>125.0</td><td>U/L</td><td>7-56</td><td>HH</td><td>22.0</td><td>103.0</td></tr>
</tbody>
</table>

<h3>欠測データの扱い</h3>
<p>検査値リスティングにおける欠測データの扱い方は以下の通りです。</p>

<table>
<thead>
<tr><th>欠測パターン</th><th>表示方法</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td>Visit全体が欠測</td><td>レコードなし or "Not Done"</td><td>予定されたVisitで検査が実施されなかった場合</td></tr>
<tr><td>特定の検査項目が欠測</td><td>"—" or 空白</td><td>一部の検査が実施されなかった場合</td></tr>
<tr><td>ベースラインが欠測</td><td>CHG列は空白</td><td>変化量が計算できない場合</td></tr>
<tr><td>基準値範囲が欠測</td><td>フラグ列は空白</td><td>基準値範囲が提供されていない場合</td></tr>
</tbody>
</table>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* 検査値リスティングの作成 */
data lb_listing;
    set adam.adlb;
    where SAFFL = 'Y' and ANL01FL = 'Y';

    /* 異常値フラグの設定 */
    length flag $2;
    flag = '';
    if ANRIND = 'HIGH' then flag = 'H';
    else if ANRIND = 'LOW' then flag = 'L';

    /* 臨床的に重要な異常値（例: 基準値上限の3倍超） */
    if PARAMCD = 'ALT' and AVAL > 3 * A1HI then flag = 'HH';
    if PARAMCD = 'ALT' and AVAL < 0.5 * A1LO then flag = 'LL';

    /* 基準値範囲の表示 */
    length range_display $20;
    if nmiss(A1LO, A1HI) = 0 then
        range_display = catx('-', put(A1LO, best8.),
                            put(A1HI, best8.));

    /* 日付の表示 */
    length date_display $11;
    if ADT ne . then date_display = put(ADT, date9.);
run;

proc sort data=lb_listing;
    by SUBJID PARAMCD AVISITN ADT;
run;

/* バイタルサインリスティング */
data vs_listing;
    set adam.advs;
    where SAFFL = 'Y' and ANL01FL = 'Y';

    length flag $2;
    flag = '';
    /* 臨床的に意味のある変化のフラグ */
    if PARAMCD = 'SYSBP' and (AVAL >= 180 or AVAL <= 90) then flag = '*';
    if PARAMCD = 'DIABP' and (AVAL >= 105 or AVAL <= 50) then flag = '*';
    if PARAMCD = 'PULSE' and (AVAL >= 120 or AVAL <= 50) then flag = '*';
run;</code></pre>
</div>

<div class="info-box warning">
<div class="info-box-title">⚠️ Hy's Law評価</div>
<p>肝機能検査値の評価では、Hy's Law（ハイの法則）に基づくスクリーニングが重要です：</p>
<ul>
<li>ALT or AST &gt; 3×ULN（基準値上限の3倍超）かつ</li>
<li>Total Bilirubin &gt; 2×ULN</li>
<li>この条件を満たす被験者はPotential Hy's Law Caseとして別途リスティング</li>
</ul>
</div>
`,
            quiz: [
                {
                    id: "q803_1",
                    type: "choice",
                    question: "検査値リスティングで基準値上限超過を示すフラグはどれですか？",
                    options: [
                        "A（Abnormal）",
                        "H（High）",
                        "U（Upper）",
                        "E（Elevated）"
                    ],
                    answer: 1,
                    explanation: "基準値上限超過にはH（High）フラグを使用します。臨床的に重要な高値にはHH（またはH*）を使用します。"
                },
                {
                    id: "q803_2",
                    type: "choice",
                    question: "Hy's Lawの条件として正しい組み合わせはどれですか？",
                    options: [
                        "ALT >2×ULN かつ Albumin <LLN",
                        "ALT or AST >3×ULN かつ Total Bilirubin >2×ULN",
                        "AST >5×ULN かつ ALP >2×ULN",
                        "ALT >10×ULN"
                    ],
                    answer: 1,
                    explanation: "Hy's Lawは、ALTまたはAST>3×ULN（基準値上限の3倍超）かつTotal Bilirubin>2×ULN（2倍超）の条件で、薬物性肝障害の重大なリスクを示します。"
                },
                {
                    id: "q803_3",
                    type: "choice",
                    question: "ADLBにおいて基準値範囲の上限値を格納する変数はどれですか？",
                    options: [
                        "ANRHI",
                        "A1HI",
                        "LBSTNRHI",
                        "ULNVAL"
                    ],
                    answer: 1,
                    explanation: "A1HI（Analysis Range 1 Upper Limit）はADLBにおいて解析用基準値範囲の上限値を格納する変数です。"
                },
                {
                    id: "q803_4",
                    type: "choice",
                    question: "検査値リスティングでベースライン値が欠測の場合、変化量（CHG）列の表示方法として正しいものはどれですか？",
                    options: [
                        "0と表示する",
                        "空白（表示なし）",
                        "N/Aと表示する",
                        "ベースラインの実測値をそのまま使用"
                    ],
                    answer: 1,
                    explanation: "ベースラインが欠測の場合、変化量は計算できないため空白（表示なし）とします。0と表示するのは誤りです。"
                },
                {
                    id: "q803_5",
                    type: "fill",
                    question: "肝機能検査値の安全性評価で使用される法則で、ALT/AST>3×ULN かつ T-Bil>2×ULN の条件を「___'s Law」と呼びます。（人名、アルファベット3文字）",
                    answer: "Hy",
                    explanation: "Hy's Law（ハイの法則）は、Hyman Zimmerman博士にちなんで名付けられた法則で、薬物性肝障害のリスク評価に使用されます。"
                }
            ]
        },
        {
            id: 804,
            title: "併用薬・医療行為リスト",
            duration: "20分",
            content: `
<h2>併用薬・医療行為リスティング</h2>
<p>併用薬（Concomitant Medications）および医療行為（Procedures）のリスティングは、試験期間中に被験者が使用した薬剤や受けた処置を記録する重要な出力物です。<strong>ADCM</strong>データセットを使用します。</p>

<h3>WHO Drug辞書とATC分類</h3>
<p>併用薬のコーディングにはWHO Drug Dictionary（WHODrug）が使用されます。WHODrugはATC（Anatomical Therapeutic Chemical）分類体系に基づいて薬剤を階層的に分類します。</p>

<table>
<thead>
<tr><th>ATC レベル</th><th>説明</th><th>コード例</th><th>名称例</th></tr>
</thead>
<tbody>
<tr><td>Level 1</td><td>解剖学的分類（14グループ）</td><td>C</td><td>Cardiovascular System</td></tr>
<tr><td>Level 2</td><td>治療サブグループ</td><td>C09</td><td>Agents Acting on Renin-Angiotensin System</td></tr>
<tr><td>Level 3</td><td>薬理サブグループ</td><td>C09A</td><td>ACE Inhibitors, Plain</td></tr>
<tr><td>Level 4</td><td>化学サブグループ</td><td>C09AA</td><td>ACE Inhibitors, Plain</td></tr>
<tr><td>Level 5</td><td>化学物質</td><td>C09AA02</td><td>Enalapril</td></tr>
</tbody>
</table>

<div class="info-box tip">
<div class="info-box-title">💡 ポイント</div>
<p>臨床試験の併用薬リスティングでは、通常ATC Level 2（治療サブグループ）での分類が使用されます。ADCMではCMCLAS（ATC Level 2）およびCMDECOD（Preferred Name）として格納されます。</p>
</div>

<h3>併用薬リスティングの表示項目</h3>
<table>
<thead>
<tr><th>表示項目</th><th>ADCM変数</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td>被験者ID</td><td>SUBJID</td><td>被験者識別子</td></tr>
<tr><td>投与群</td><td>TRT01A</td><td>実際の投与群</td></tr>
<tr><td>ATC分類</td><td>CMCLAS</td><td>ATC Level 2 分類</td></tr>
<tr><td>薬剤名（Preferred）</td><td>CMDECOD</td><td>WHODrug Preferred Name</td></tr>
<tr><td>薬剤名（報告）</td><td>CMTRT</td><td>報告された薬剤名（原文）</td></tr>
<tr><td>用量</td><td>CMDOSE + CMDOSU</td><td>用量と単位</td></tr>
<tr><td>投与経路</td><td>CMROUTE</td><td>経口、静注等</td></tr>
<tr><td>適応症</td><td>CMINDC</td><td>使用理由</td></tr>
<tr><td>開始日</td><td>CMSTDTC / ASTDT</td><td>薬剤の使用開始日</td></tr>
<tr><td>終了日</td><td>CMENDTC / AENDT</td><td>薬剤の使用終了日</td></tr>
<tr><td>使用時期</td><td>ONTRTFL等</td><td>前治療/併用/後治療の区分</td></tr>
</tbody>
</table>

<h3>併用薬の時期区分</h3>
<table>
<thead>
<tr><th>区分</th><th>定義</th><th>フラグ変数例</th></tr>
</thead>
<tbody>
<tr><td>前治療薬（Prior）</td><td>治験薬投与開始前に使用終了</td><td>PREFL = 'Y'</td></tr>
<tr><td>併用薬（Concomitant）</td><td>治験薬投与期間中に使用</td><td>ONTRTFL = 'Y'</td></tr>
<tr><td>後治療薬（Post）</td><td>治験薬投与終了後に使用開始</td><td>—</td></tr>
</tbody>
</table>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* 併用薬リスティングの作成 */
data cm_listing;
    set adam.adcm;
    where SAFFL = 'Y';

    /* 日付の表示 */
    length start_dt end_dt $11;
    if ASTDT ne . then start_dt = put(ASTDT, date9.);
    else start_dt = '';
    if AENDT ne . then end_dt = put(AENDT, date9.);
    else end_dt = 'Ongoing';

    /* 用量の表示 */
    length dose_display $50;
    if CMDOSE ne . then
        dose_display = catx(' ', put(CMDOSE, best8.), CMDOSU);

    /* 使用時期の分類 */
    length timing $15;
    if PREFL = 'Y' and ONTRTFL ne 'Y' then timing = 'Prior';
    else if ONTRTFL = 'Y' then timing = 'Concomitant';
    else timing = 'Post-treatment';
run;

proc sort data=cm_listing;
    by SUBJID CMCLAS CMDECOD ASTDT;
run;

/* リスティング出力 */
proc report data=cm_listing nowd split='~'
    style(column)=[font_size=7pt vjust=top];

    column SUBJID TRT01A CMCLAS CMDECOD CMTRT
           dose_display CMROUTE CMINDC start_dt end_dt timing;

    define SUBJID / order "Subject~ID"
        style(column)=[cellwidth=0.7in];
    define TRT01A / order "Treatment"
        style(column)=[cellwidth=0.7in];
    define CMCLAS / order "ATC~Class"
        style(column)=[cellwidth=1.0in];
    define CMDECOD / display "Preferred~Name"
        style(column)=[cellwidth=0.9in];
    define CMTRT / display "Reported~Name"
        style(column)=[cellwidth=0.9in];
    define dose_display / display "Dose"
        style(column)=[cellwidth=0.7in];
    define CMROUTE / display "Route"
        style(column)=[cellwidth=0.6in];
    define CMINDC / display "Indication"
        style(column)=[cellwidth=0.9in];
    define start_dt / display "Start~Date"
        style(column)=[cellwidth=0.7in];
    define end_dt / display "End~Date"
        style(column)=[cellwidth=0.7in];
    define timing / display "Timing"
        style(column)=[cellwidth=0.7in];

    break after SUBJID / page;
run;</code></pre>
</div>

<h3>併用療法の一覧</h3>
<p>特定の併用療法（例: 禁止薬、許容薬）に焦点を当てたリスティングも作成します。</p>

<div class="info-box warning">
<div class="info-box-title">⚠️ 注意点</div>
<ul>
<li>禁止薬の使用はプロトコル逸脱として扱われる可能性がある</li>
<li>治験薬との薬物相互作用のリスクがある併用薬は特別な注意が必要</li>
<li>レスキュー薬（Rescue Medication）の使用は有効性評価に影響するため、別途リスティング</li>
<li>不完全な日付（CMSTDTC = "2024-03"等）の取り扱いに注意</li>
</ul>
</div>
`,
            quiz: [
                {
                    id: "q804_1",
                    type: "choice",
                    question: "併用薬のコーディングに使用される国際的な辞書はどれですか？",
                    options: [
                        "MedDRA",
                        "SNOMED CT",
                        "WHO Drug Dictionary（WHODrug）",
                        "ICD-10"
                    ],
                    answer: 2,
                    explanation: "併用薬のコーディングにはWHO Drug Dictionary（WHODrug）が使用されます。MedDRAは有害事象・既往歴のコーディングに使用されます。"
                },
                {
                    id: "q804_2",
                    type: "choice",
                    question: "ATC分類体系において、Level 2が表すものはどれですか？",
                    options: [
                        "解剖学的分類",
                        "治療サブグループ",
                        "薬理サブグループ",
                        "化学物質"
                    ],
                    answer: 1,
                    explanation: "ATC分類のLevel 2は治療サブグループを表します。Level 1が解剖学的分類、Level 3が薬理サブグループ、Level 5が化学物質です。"
                },
                {
                    id: "q804_3",
                    type: "choice",
                    question: "ADCMにおいて、治験薬投与期間中に使用された薬剤を示すフラグ変数はどれですか？",
                    options: [
                        "PREFL",
                        "ONTRTFL",
                        "SAFFL",
                        "CONFL"
                    ],
                    answer: 1,
                    explanation: "ONTRTFL（On Treatment Flag）は、治験薬投与期間中に使用された薬剤（併用薬）を識別するフラグ変数です。"
                },
                {
                    id: "q804_4",
                    type: "choice",
                    question: "レスキュー薬（Rescue Medication）の使用が特に問題となる理由はどれですか？",
                    options: [
                        "安全性評価に影響するため",
                        "有効性評価に影響するため",
                        "薬物動態に影響するため",
                        "データベースのサイズが増加するため"
                    ],
                    answer: 1,
                    explanation: "レスキュー薬の使用は主要評価項目の結果に影響するため、有効性評価において重要な因子です。そのため、別途リスティングとして報告します。"
                },
                {
                    id: "q804_5",
                    type: "fill",
                    question: "ATC分類の正式名称は「Anatomical Therapeutic _____」分類体系です。（アルファベット8文字）",
                    answer: "Chemical",
                    explanation: "ATC（Anatomical Therapeutic Chemical）分類体系は、WHO Drug Dictionaryで使用される薬剤の分類システムで、解剖学的・治療学的・化学的特性に基づいて分類します。"
                }
            ]
        }
    ]
};
