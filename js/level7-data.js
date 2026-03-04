/* ============================================
   TLF Academy - Level 7: Tables（表）の応用
   ============================================ */

const LEVEL7_DATA = {
    id: 7,
    title: "Tables（表）の応用",
    icon: "📑",
    description: "有効性解析・検査値・サブグループ解析など応用的な表の作成を学ぶ",
    modules: [
        {
            id: 701,
            title: "有効性解析表",
            duration: "30分",
            content: `
<h2>有効性解析表の概要</h2>
<p>有効性解析表は、治験薬の治療効果を評価するための最も重要な表です。主要評価項目（Primary Endpoint）および副次評価項目（Secondary Endpoints）の解析結果を、統計的検定結果とともに報告します。</p>

<div class="info-box tip">
<div class="info-box-title">💡 ポイント</div>
有効性解析表はCSR（Clinical Study Report）のSection 14.2に配置されることが多く、SAP（Statistical Analysis Plan）で定義された統計手法に厳密に従って作成します。
</div>

<h3>主要評価項目の解析表</h3>
<p>主要評価項目の解析表には、以下の要素が含まれます。</p>

<table>
<thead>
<tr><th>要素</th><th>説明</th><th>表示例</th></tr>
</thead>
<tbody>
<tr><td>ベースライン値</td><td>投与開始前の測定値</td><td>Mean (SD)</td></tr>
<tr><td>評価時点の値</td><td>主要評価時点の測定値</td><td>Mean (SD)</td></tr>
<tr><td>ベースラインからの変化量</td><td>Change from Baseline</td><td>LS Mean (SE)</td></tr>
<tr><td>群間差</td><td>投与群間の差</td><td>LS Mean difference</td></tr>
<tr><td>信頼区間</td><td>95% CI</td><td>(Lower, Upper)</td></tr>
<tr><td>p値</td><td>統計的検定のp値</td><td>0.0012</td></tr>
</tbody>
</table>

<h3>ANCOVAに基づく有効性解析表</h3>
<p>多くの臨床試験では、ANCOVA（共分散分析）を用いて主要評価項目を解析します。</p>

<table>
<thead>
<tr><th>統計量</th><th>Placebo (N=100)</th><th>Drug A (N=102)</th></tr>
</thead>
<tbody>
<tr><td><strong>Baseline</strong></td><td></td><td></td></tr>
<tr><td>&nbsp;&nbsp;n</td><td>98</td><td>100</td></tr>
<tr><td>&nbsp;&nbsp;Mean (SD)</td><td>25.3 (5.82)</td><td>25.1 (5.64)</td></tr>
<tr><td><strong>Week 12</strong></td><td></td><td></td></tr>
<tr><td>&nbsp;&nbsp;n</td><td>92</td><td>95</td></tr>
<tr><td>&nbsp;&nbsp;Mean (SD)</td><td>23.8 (6.15)</td><td>20.2 (5.78)</td></tr>
<tr><td><strong>Change from Baseline</strong></td><td></td><td></td></tr>
<tr><td>&nbsp;&nbsp;LS Mean (SE) [a]</td><td>-1.5 (0.58)</td><td>-4.9 (0.57)</td></tr>
<tr><td>&nbsp;&nbsp;LS Mean difference vs Placebo (95% CI)</td><td>—</td><td>-3.4 (-4.98, -1.82)</td></tr>
<tr><td>&nbsp;&nbsp;p-value [b]</td><td>—</td><td>&lt;0.0001</td></tr>
</tbody>
</table>

<div class="info-box tip">
<div class="info-box-title">💡 脚注の例</div>
<p>[a] LS Mean and SE from ANCOVA model with treatment as factor and baseline value as covariate.</p>
<p>[b] p-value from ANCOVA model for treatment comparison.</p>
</div>

<h3>感度分析結果の表示</h3>
<p>主要解析の頑健性を確認するために、感度分析（Sensitivity Analysis）の結果も表として報告します。</p>
<ul>
<li><strong>LOCF（Last Observation Carried Forward）</strong>：最終観測値の繰越</li>
<li><strong>MMRM（Mixed Model for Repeated Measures）</strong>：反復測定混合モデル</li>
<li><strong>MI（Multiple Imputation）</strong>：多重代入法</li>
<li><strong>Tipping Point Analysis</strong>：欠測データの感度分析</li>
</ul>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* ANCOVAによる有効性解析 */
proc mixed data=adam.adeff;
    where ITTFL = 'Y' and AVISIT = 'Week 12' and ANL01FL = 'Y';
    class TRT01P(ref='Placebo') SITEID;
    model CHG = TRT01P BASE SITEID / solution ddfm=kr;
    lsmeans TRT01P / diff cl alpha=0.05;
    ods output LSMeans=lsmeans Diffs=diffs;
run;

/* MMRMによる感度分析 */
proc mixed data=adam.adeff;
    where ITTFL = 'Y' and AVISITN in (4, 8, 12) and ANL01FL = 'Y';
    class TRT01P(ref='Placebo') USUBJID AVISIT SITEID;
    model CHG = TRT01P BASE SITEID AVISIT TRT01P*AVISIT
        / solution ddfm=kr;
    repeated AVISIT / subject=USUBJID type=un;
    lsmeans TRT01P*AVISIT / slice=AVISIT diff cl;
    ods output SliceDiffs=mmrm_diffs;
run;</code></pre>
</div>

<div class="info-box warning">
<div class="info-box-title">⚠️ p値の表示規則</div>
<ul>
<li>p値は通常4桁（例: 0.0012）で表示</li>
<li>p &lt; 0.0001 の場合は「&lt;0.0001」と表示</li>
<li>多重比較の調整が必要な場合、調整前と調整後のp値を併記</li>
<li>片側/両側検定の区別を脚注で明記</li>
</ul>
</div>
`,
            quiz: [
                {
                    id: "q701_1",
                    type: "choice",
                    question: "有効性解析表でLS Meanを算出する際に最も一般的に使用される統計手法はどれですか？",
                    options: [
                        "t検定",
                        "ANCOVA",
                        "カイ二乗検定",
                        "ウィルコクソン検定"
                    ],
                    answer: 1,
                    explanation: "ANCOVA（共分散分析）は、ベースライン値を共変量として調整したLS Mean（最小二乗平均）を算出するために最も一般的に使用されます。"
                },
                {
                    id: "q701_2",
                    type: "choice",
                    question: "p値が0.00003の場合、有効性解析表での表示方法として正しいものはどれですか？",
                    options: [
                        "0.00003",
                        "0.0000",
                        "<0.0001",
                        "0.001"
                    ],
                    answer: 2,
                    explanation: "p値が0.0001未満の場合、「<0.0001」と表示するのが一般的な規則です。具体的な数値ではなく、閾値未満であることを示します。"
                },
                {
                    id: "q701_3",
                    type: "choice",
                    question: "MMRMの正式名称として正しいものはどれですか？",
                    options: [
                        "Multiple Measurement Regression Model",
                        "Mixed Model for Repeated Measures",
                        "Maximum Marginal Regression Method",
                        "Multiple Mixed Random Model"
                    ],
                    answer: 1,
                    explanation: "MMRM（Mixed Model for Repeated Measures）は反復測定混合モデルの略称で、経時的データの解析に使用される感度分析手法です。"
                },
                {
                    id: "q701_4",
                    type: "choice",
                    question: "ANCOVA有効性解析表の脚注に含めるべき情報として最も重要なものはどれですか？",
                    options: [
                        "プログラマーの名前",
                        "モデルに含まれる因子と共変量の説明",
                        "データの収集方法",
                        "被験者のスクリーニング基準"
                    ],
                    answer: 1,
                    explanation: "ANCOVA解析表の脚注では、モデルに含まれる因子（treatment, site等）と共変量（baseline value等）を明記することが最も重要です。"
                },
                {
                    id: "q701_5",
                    type: "fill",
                    question: "有効性解析において、欠測データに対して最終観測値を繰り越す方法の略称は「____」です。（アルファベット4文字）",
                    answer: "LOCF",
                    explanation: "LOCF（Last Observation Carried Forward）は、最終観測値を繰り越して欠測を補完する方法です。ただし、近年ではMMRMやMIなどのより適切な手法が推奨されています。"
                }
            ]
        },
        {
            id: 702,
            title: "検査値要約表",
            duration: "30分",
            content: `
<h2>検査値要約表の概要</h2>
<p>検査値要約表は、臨床検査データ（血液学、血液生化学、尿検査等）の推移を要約する表です。<strong>ADLB</strong>データセットを使用し、Visit別の実測値、ベースラインからの変化量、基準値範囲外の頻度などを投与群ごとに報告します。</p>

<div class="info-box tip">
<div class="info-box-title">💡 ポイント</div>
検査値要約表は安全性評価の重要な構成要素であり、CSRのSection 14.3に配置されることが多いです。表のバリエーションが多く、試験あたり複数の表が必要になります。
</div>

<h3>Visit別推移表</h3>
<p>最も基本的な検査値表は、Visit別の要約統計量を投与群ごとに表示する推移表です。</p>

<table>
<thead>
<tr><th>Visit</th><th>統計量</th><th>Placebo (N=100)</th><th>Drug A (N=102)</th></tr>
</thead>
<tbody>
<tr><td><strong>Baseline</strong></td><td>n</td><td>98</td><td>100</td></tr>
<tr><td></td><td>Mean (SD)</td><td>142.5 (35.82)</td><td>140.8 (34.67)</td></tr>
<tr><td></td><td>Median</td><td>138.0</td><td>137.5</td></tr>
<tr><td></td><td>Min, Max</td><td>68, 245</td><td>72, 238</td></tr>
<tr><td><strong>Week 4</strong></td><td>n</td><td>95</td><td>98</td></tr>
<tr><td></td><td>Mean (SD)</td><td>140.2 (36.15)</td><td>128.5 (32.43)</td></tr>
<tr><td></td><td>Median</td><td>136.0</td><td>125.0</td></tr>
<tr><td></td><td>Min, Max</td><td>65, 250</td><td>60, 225</td></tr>
</tbody>
</table>

<h3>ベースラインからの変化量</h3>
<p>ベースラインからの変化量（Change from Baseline）は、治療効果の評価に重要な指標です。</p>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* Visit別の検査値要約統計量 */
proc means data=adam.adlb nway noprint;
    where SAFFL = 'Y' and PARAMCD = 'ALT'
      and ANL01FL = 'Y' and AVISIT ne '';
    class TRT01A AVISIT AVISITN;
    var AVAL BASE CHG;
    output out=lb_stats
        n(AVAL)=n_aval mean(AVAL)=mean_aval std(AVAL)=std_aval
        median(AVAL)=med_aval min(AVAL)=min_aval max(AVAL)=max_aval
        n(CHG)=n_chg mean(CHG)=mean_chg std(CHG)=std_chg;
run;

/* 表示用データセットの作成 */
data lb_display;
    set lb_stats;
    length col_aval col_chg $50;
    /* 実測値の Mean (SD) */
    col_aval = catx(' ', put(mean_aval, 8.1),
                    cats('(', put(std_aval, 8.2), ')'));
    /* 変化量の Mean (SD) */
    col_chg = catx(' ', put(mean_chg, 8.1),
                   cats('(', put(std_chg, 8.2), ')'));
run;</code></pre>
</div>

<h3>基準値範囲外の集計</h3>
<p>基準値範囲（Normal Range）に基づく異常値の集計も重要な安全性指標です。</p>

<table>
<thead>
<tr><th>カテゴリ</th><th>ADLB変数</th><th>定義</th></tr>
</thead>
<tbody>
<tr><td>基準値範囲内</td><td>ANRIND = 'NORMAL'</td><td>A1LO ≤ AVAL ≤ A1HI</td></tr>
<tr><td>基準値下限未満</td><td>ANRIND = 'LOW'</td><td>AVAL &lt; A1LO</td></tr>
<tr><td>基準値上限超過</td><td>ANRIND = 'HIGH'</td><td>AVAL &gt; A1HI</td></tr>
</tbody>
</table>

<h3>Shift Table（シフト表）</h3>
<p>Shift Tableは、ベースラインから投与後への検査値カテゴリの変化を表形式で示す表です。</p>

<table>
<thead>
<tr><th></th><th colspan="3"><strong>Post-baseline Worst Case</strong></th></tr>
<tr><th>Baseline</th><th>Low</th><th>Normal</th><th>High</th></tr>
</thead>
<tbody>
<tr><td><strong>Low</strong></td><td>2</td><td>5</td><td>0</td></tr>
<tr><td><strong>Normal</strong></td><td>3</td><td>75</td><td>8</td></tr>
<tr><td><strong>High</strong></td><td>0</td><td>2</td><td>5</td></tr>
</tbody>
</table>

<div class="info-box warning">
<div class="info-box-title">⚠️ Shift Tableの注意点</div>
<ul>
<li>ベースライン値と投与後の最悪値（Worst Case）を使用するのが一般的</li>
<li>ベースラインが欠測の場合は除外（または「Missing」カテゴリを追加）</li>
<li>Normal → High、Normal → Low への変化が臨床的に重要</li>
</ul>
</div>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* Shift Table の作成 */
/* ベースラインと投与後最悪値の取得 */
proc sql;
    create table shift_data as
    select a.USUBJID, a.TRT01A, a.PARAMCD,
           a.BNRIND as baseline_cat,    /* ベースラインのカテゴリ */
           b.ANRIND as worst_cat        /* 投与後最悪値のカテゴリ */
    from adam.adlb a
    inner join (
        select USUBJID, PARAMCD,
               case
                   when min(ANRLO_flag) = 1 then 'LOW'
                   when max(ANRHI_flag) = 1 then 'HIGH'
                   else 'NORMAL'
               end as ANRIND
        from adam.adlb
        where SAFFL = 'Y' and TRTEMFL = 'Y' and ANL01FL = 'Y'
        group by USUBJID, PARAMCD
    ) b on a.USUBJID = b.USUBJID and a.PARAMCD = b.PARAMCD
    where a.ABLFL = 'Y' and a.SAFFL = 'Y';
quit;

/* Shift Table集計 */
proc freq data=shift_data noprint;
    where PARAMCD = 'ALT';
    tables TRT01A * baseline_cat * worst_cat / out=shift_freq;
run;</code></pre>
</div>
`,
            quiz: [
                {
                    id: "q702_1",
                    type: "choice",
                    question: "検査値要約表で主に使用するADaMデータセットはどれですか？",
                    options: [
                        "ADSL",
                        "ADAE",
                        "ADLB",
                        "ADCM"
                    ],
                    answer: 2,
                    explanation: "検査値要約表ではADLB（Analysis Dataset for Laboratory）を使用します。ADLBには臨床検査データの実測値、ベースライン値、変化量、基準値範囲情報が格納されています。"
                },
                {
                    id: "q702_2",
                    type: "choice",
                    question: "Shift Tableで通常使用する投与後の値として正しいものはどれですか？",
                    options: [
                        "最終観測値",
                        "各Visit値の平均",
                        "投与後の最悪値（Worst Case）",
                        "最初の投与後値"
                    ],
                    answer: 2,
                    explanation: "Shift Tableでは、投与後の最悪値（Worst Case Post-baseline）を使用するのが一般的です。これにより、治療期間中の最も悪いシフトを捉えることができます。"
                },
                {
                    id: "q702_3",
                    type: "choice",
                    question: "ADLBにおいてベースラインレコードを識別するフラグ変数はどれですか？",
                    options: [
                        "BASEFLAG",
                        "ABLFL",
                        "BNRIND",
                        "ANL01FL"
                    ],
                    answer: 1,
                    explanation: "ABLFL（Analysis Baseline Flag）は、ADLBにおいてベースラインレコードを識別するフラグ変数です。'Y'の場合、そのレコードがベースライン値であることを示します。"
                },
                {
                    id: "q702_4",
                    type: "choice",
                    question: "ADLBで基準値範囲のカテゴリを示す変数ANRINDの値として正しい組み合わせはどれですか？",
                    options: [
                        "BELOW / WITHIN / ABOVE",
                        "LOW / NORMAL / HIGH",
                        "L / N / H",
                        "ABNORMAL_LOW / NORMAL / ABNORMAL_HIGH"
                    ],
                    answer: 1,
                    explanation: "ANRINDは基準値範囲に基づくカテゴリを示し、LOW（下限未満）、NORMAL（範囲内）、HIGH（上限超過）の値を取ります。"
                },
                {
                    id: "q702_5",
                    type: "fill",
                    question: "ベースラインから投与後への検査値カテゴリの変化を表形式で示す表を「_____ Table」と呼びます。（アルファベット5文字）",
                    answer: "Shift",
                    explanation: "Shift Table（シフト表）は、ベースラインの検査値カテゴリ（Low/Normal/High）から投与後のカテゴリへの変化（シフト）をクロス集計で示す表です。"
                }
            ]
        },
        {
            id: 703,
            title: "サブグループ解析表",
            duration: "25分",
            content: `
<h2>サブグループ解析表の概要</h2>
<p>サブグループ解析表は、治療効果が特定の患者サブグループ（年齢、性別、地域、疾患重症度等）によって異なるかを評価するための表です。規制当局への申請では、事前に計画されたサブグループ解析の結果を報告することが求められます。</p>

<div class="info-box tip">
<div class="info-box-title">💡 ポイント</div>
サブグループ解析はSAPで事前に定義されたものが主要な結果となります。事後的（post-hoc）なサブグループ解析は探索的な位置づけとなり、その旨を表の脚注に明記する必要があります。
</div>

<h3>一般的なサブグループ変数</h3>
<table>
<thead>
<tr><th>カテゴリ</th><th>サブグループ変数</th><th>カットオフ例</th></tr>
</thead>
<tbody>
<tr><td>年齢</td><td>AGEGR1, AGEGR2</td><td>&lt;65 / ≥65, &lt;75 / ≥75</td></tr>
<tr><td>性別</td><td>SEX</td><td>Male / Female</td></tr>
<tr><td>人種</td><td>RACE</td><td>White / Black or African American / Asian / Other</td></tr>
<tr><td>地域</td><td>REGION1</td><td>North America / Europe / Asia-Pacific</td></tr>
<tr><td>ベースライン重症度</td><td>カスタム変数</td><td>Mild / Moderate / Severe</td></tr>
<tr><td>前治療歴</td><td>カスタム変数</td><td>Yes / No</td></tr>
</tbody>
</table>

<h3>サブグループ解析表のレイアウト</h3>
<table>
<thead>
<tr><th>サブグループ</th><th>n</th><th>Placebo<br>LS Mean (SE)</th><th>Drug A<br>LS Mean (SE)</th><th>差 (95% CI)</th><th>p-value</th></tr>
</thead>
<tbody>
<tr><td><strong>全体</strong></td><td>202</td><td>-1.5 (0.58)</td><td>-4.9 (0.57)</td><td>-3.4 (-4.98, -1.82)</td><td>&lt;0.0001</td></tr>
<tr><td><strong>年齢</strong></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>&nbsp;&nbsp;&lt;65歳</td><td>148</td><td>-1.8 (0.65)</td><td>-5.2 (0.63)</td><td>-3.4 (-5.18, -1.62)</td><td>0.0002</td></tr>
<tr><td>&nbsp;&nbsp;≥65歳</td><td>54</td><td>-0.8 (1.12)</td><td>-4.1 (1.08)</td><td>-3.3 (-6.38, -0.22)</td><td>0.0362</td></tr>
<tr><td>&nbsp;&nbsp;Interaction p-value</td><td></td><td></td><td></td><td></td><td>0.9215</td></tr>
<tr><td><strong>性別</strong></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>&nbsp;&nbsp;男性</td><td>113</td><td>-1.6 (0.75)</td><td>-5.0 (0.74)</td><td>-3.4 (-5.48, -1.32)</td><td>0.0014</td></tr>
<tr><td>&nbsp;&nbsp;女性</td><td>89</td><td>-1.3 (0.88)</td><td>-4.7 (0.85)</td><td>-3.4 (-5.82, -0.98)</td><td>0.0061</td></tr>
<tr><td>&nbsp;&nbsp;Interaction p-value</td><td></td><td></td><td></td><td></td><td>0.8756</td></tr>
</tbody>
</table>

<div class="info-box warning">
<div class="info-box-title">⚠️ 交互作用検定</div>
<p>Interaction p-valueは、治療効果がサブグループ間で統計的に有意に異なるかを検定します。有意水準は通常0.10を使用し（検出力が低いため）、有意な交互作用がある場合はさらなる検討が必要です。</p>
</div>

<h3>Forest Plotとの連携</h3>
<p>サブグループ解析表はForest Plotと連携して表示されることが多く、表の数値データとForest Plotの視覚的表現が一致していることの確認が重要です。</p>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* サブグループ解析 - 各サブグループごとのANCOVA */
%macro subgroup_analysis(subgrp=, subgrp_val=);
    proc mixed data=adam.adeff;
        where ITTFL = 'Y' and AVISIT = 'Week 12'
          and ANL01FL = 'Y' and &subgrp = "&subgrp_val";
        class TRT01P(ref='Placebo') SITEID;
        model CHG = TRT01P BASE SITEID / solution ddfm=kr;
        lsmeans TRT01P / diff cl alpha=0.05;
        ods output LSMeans=lsm_&subgrp._&subgrp_val
                   Diffs=diff_&subgrp._&subgrp_val;
    run;
%mend;

/* 年齢別 */
%subgroup_analysis(subgrp=AGEGR1, subgrp_val=<65);
%subgroup_analysis(subgrp=AGEGR1, subgrp_val=>=65);

/* 交互作用検定 */
proc mixed data=adam.adeff;
    where ITTFL = 'Y' and AVISIT = 'Week 12' and ANL01FL = 'Y';
    class TRT01P(ref='Placebo') AGEGR1 SITEID;
    model CHG = TRT01P BASE SITEID AGEGR1 TRT01P*AGEGR1
        / solution ddfm=kr;
    ods output Tests3=interaction_test;
run;</code></pre>
</div>

<div class="info-box tip">
<div class="info-box-title">💡 サブグループ解析の注意点</div>
<ul>
<li>サブグループ解析は多重比較の問題があるため、結果の解釈には注意が必要</li>
<li>各サブグループのn数が小さい場合、統計的検出力が低下する</li>
<li>事前定義されたサブグループと事後解析を明確に区別する</li>
<li>Forest Plotの数値が表の数値と完全に一致していることを確認する</li>
</ul>
</div>
`,
            quiz: [
                {
                    id: "q703_1",
                    type: "choice",
                    question: "サブグループ解析のInteraction p-valueの一般的な有意水準はどれですか？",
                    options: [
                        "0.001",
                        "0.01",
                        "0.05",
                        "0.10"
                    ],
                    answer: 3,
                    explanation: "Interaction p-valueの有意水準は通常0.10が使用されます。交互作用検定は検出力が低いため、通常の0.05より緩い基準が採用されます。"
                },
                {
                    id: "q703_2",
                    type: "choice",
                    question: "サブグループ解析表で事後的（post-hoc）解析を報告する際に必要な対応はどれですか？",
                    options: [
                        "p値を報告しない",
                        "脚注に探索的解析である旨を明記する",
                        "信頼区間を報告しない",
                        "サブグループ名を匿名にする"
                    ],
                    answer: 1,
                    explanation: "事後的なサブグループ解析は探索的な位置づけのため、脚注にその旨を明記する必要があります。事前にSAPで定義されたものと区別するためです。"
                },
                {
                    id: "q703_3",
                    type: "choice",
                    question: "サブグループ解析の交互作用検定で使用するSASのモデル項はどれですか？",
                    options: [
                        "TRT01P + SUBGROUP",
                        "TRT01P SUBGROUP",
                        "TRT01P*SUBGROUP",
                        "TRT01P(SUBGROUP)"
                    ],
                    answer: 2,
                    explanation: "交互作用検定ではTRT01P*SUBGROUP（治療群×サブグループ変数の交互作用項）をモデルに含めます。この項の有意性が交互作用の有無を示します。"
                },
                {
                    id: "q703_4",
                    type: "choice",
                    question: "サブグループ解析表と連携して表示されることが多い図表はどれですか？",
                    options: [
                        "Kaplan-Meier曲線",
                        "箱ひげ図",
                        "Forest Plot",
                        "散布図"
                    ],
                    answer: 2,
                    explanation: "Forest Plotはサブグループ解析の結果を視覚的に表現する図であり、サブグループ解析表と連携して報告されることが一般的です。"
                },
                {
                    id: "q703_5",
                    type: "fill",
                    question: "サブグループ解析が事前に定義される文書の略称は「___」です。（アルファベット3文字）",
                    answer: "SAP",
                    explanation: "SAP（Statistical Analysis Plan：統計解析計画書）にサブグループ解析が事前に定義されます。SAPで定義されたサブグループ解析が主要な結果となります。"
                }
            ]
        },
        {
            id: 704,
            title: "バイタルサイン・心電図の表",
            duration: "25分",
            content: `
<h2>バイタルサイン・心電図データの表</h2>
<p>バイタルサイン（血圧、脈拍、体温等）および心電図（ECG）データの要約表は、安全性評価の重要な構成要素です。<strong>ADVS</strong>（バイタルサイン）および<strong>ADEG</strong>（心電図）データセットを使用します。</p>

<div class="info-box tip">
<div class="info-box-title">💡 ポイント</div>
バイタルサインと心電図の表は、検査値要約表と類似した構造を持ちますが、測定条件（体位、測定時期等）や臨床的に意味のある変化（Clinically Significant Change）の判定基準が特有です。
</div>

<h3>バイタルサインの主要パラメータ</h3>
<table>
<thead>
<tr><th>パラメータ</th><th>PARAMCD</th><th>単位</th><th>臨床的に重要な変化の基準例</th></tr>
</thead>
<tbody>
<tr><td>収縮期血圧</td><td>SYSBP</td><td>mmHg</td><td>≥180 or ≤90、ベースラインから≥20増加</td></tr>
<tr><td>拡張期血圧</td><td>DIABP</td><td>mmHg</td><td>≥105 or ≤50、ベースラインから≥15増加</td></tr>
<tr><td>脈拍数</td><td>PULSE</td><td>beats/min</td><td>≥120 or ≤50</td></tr>
<tr><td>体温</td><td>TEMP</td><td>°C</td><td>≥38.5</td></tr>
<tr><td>呼吸数</td><td>RESP</td><td>breaths/min</td><td>≥25 or ≤8</td></tr>
<tr><td>体重</td><td>WEIGHT</td><td>kg</td><td>ベースラインから≥7%変化</td></tr>
</tbody>
</table>

<h3>経時変化の要約表</h3>
<p>Visit別の実測値とベースラインからの変化量を投与群ごとに要約します。</p>

<table>
<thead>
<tr><th>収縮期血圧 (mmHg)</th><th>統計量</th><th>Placebo (N=100)</th><th>Drug A (N=102)</th></tr>
</thead>
<tbody>
<tr><td><strong>Baseline</strong></td><td>n</td><td>100</td><td>102</td></tr>
<tr><td></td><td>Mean (SD)</td><td>128.5 (14.32)</td><td>129.2 (13.98)</td></tr>
<tr><td><strong>Week 4</strong></td><td>n</td><td>97</td><td>99</td></tr>
<tr><td></td><td>Mean (SD)</td><td>127.8 (14.56)</td><td>122.5 (13.25)</td></tr>
<tr><td>&nbsp;&nbsp;Change from BL</td><td>Mean (SD)</td><td>-0.7 (8.23)</td><td>-6.7 (8.15)</td></tr>
<tr><td><strong>Week 8</strong></td><td>n</td><td>95</td><td>98</td></tr>
<tr><td></td><td>Mean (SD)</td><td>128.2 (15.12)</td><td>120.8 (12.85)</td></tr>
<tr><td>&nbsp;&nbsp;Change from BL</td><td>Mean (SD)</td><td>-0.3 (8.45)</td><td>-8.4 (8.32)</td></tr>
</tbody>
</table>

<h3>カテゴリカル異常の要約</h3>
<p>臨床的に意味のある異常（Clinically Significant Abnormality）の発現頻度を集計します。</p>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* バイタルサインの経時変化要約 */
proc means data=adam.advs nway noprint;
    where SAFFL = 'Y' and PARAMCD = 'SYSBP'
      and ANL01FL = 'Y' and AVISIT ne '';
    class TRT01A AVISIT AVISITN;
    var AVAL CHG;
    output out=vs_stats
        n=n mean=mean std=std median=median min=min max=max;
run;

/* カテゴリカル異常の集計 */
data vs_abnormal;
    set adam.advs;
    where SAFFL = 'Y' and PARAMCD = 'SYSBP'
      and ANL01FL = 'Y' and TRTEMFL = 'Y';

    /* 臨床的に意味のある変化の判定 */
    length crit_flag $1;
    if AVAL >= 180 or AVAL <= 90 then crit_flag = 'Y';
    if CHG >= 20 then crit_flag = 'Y';
run;

proc freq data=vs_abnormal noprint;
    where crit_flag = 'Y';
    tables TRT01A * PARAMCD / out=vs_abnorm_freq;
run;</code></pre>
</div>

<h3>心電図（ECG）データの表</h3>
<p>心電図データでは、QTc間隔（補正QT間隔）が特に重要な安全性パラメータです。</p>

<table>
<thead>
<tr><th>ECGパラメータ</th><th>PARAMCD</th><th>ICH E14基準</th></tr>
</thead>
<tbody>
<tr><td>QTcF（Fridericia補正）</td><td>QTCF</td><td>&gt;450, &gt;480, &gt;500 msec</td></tr>
<tr><td>QTcB（Bazett補正）</td><td>QTCB</td><td>同上</td></tr>
<tr><td>ΔQTc（変化量）</td><td>QTCFCHG</td><td>&gt;30, &gt;60 msec increase from BL</td></tr>
<tr><td>HR（心拍数）</td><td>HR</td><td>&lt;50, &gt;100 bpm</td></tr>
<tr><td>PR間隔</td><td>PR</td><td>&gt;200 msec</td></tr>
<tr><td>QRS幅</td><td>QRS</td><td>&gt;120 msec</td></tr>
</tbody>
</table>

<div class="info-box danger">
<div class="info-box-title">🚨 ICH E14ガイドライン</div>
<p>QTc延長は致死的不整脈（Torsades de Pointes）のリスク因子であり、ICH E14ガイドラインに基づく評価が必須です：</p>
<ul>
<li>QTcF &gt;500 msec：重大な安全性シグナル</li>
<li>ΔQTcF &gt;60 msec：臨床的に重要な延長</li>
<li>これらのカテゴリ別の発現頻度を必ず報告すること</li>
</ul>
</div>

<h3>QTcカテゴリ別集計表</h3>
<table>
<thead>
<tr><th>QTcF カテゴリ</th><th>Placebo (N=100)<br>n (%)</th><th>Drug A (N=102)<br>n (%)</th></tr>
</thead>
<tbody>
<tr><td><strong>絶対値カテゴリ（投与後最大値）</strong></td><td></td><td></td></tr>
<tr><td>&nbsp;&nbsp;&gt;450 msec</td><td>5 (5.0%)</td><td>8 (7.8%)</td></tr>
<tr><td>&nbsp;&nbsp;&gt;480 msec</td><td>1 (1.0%)</td><td>3 (2.9%)</td></tr>
<tr><td>&nbsp;&nbsp;&gt;500 msec</td><td>0</td><td>1 (1.0%)</td></tr>
<tr><td><strong>ベースラインからの変化量カテゴリ</strong></td><td></td><td></td></tr>
<tr><td>&nbsp;&nbsp;&gt;30 msec increase</td><td>8 (8.0%)</td><td>12 (11.8%)</td></tr>
<tr><td>&nbsp;&nbsp;&gt;60 msec increase</td><td>2 (2.0%)</td><td>4 (3.9%)</td></tr>
</tbody>
</table>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* QTcカテゴリ別集計 */
data eg_qtc_cat;
    set adam.adeg;
    where SAFFL = 'Y' and PARAMCD = 'QTCF'
      and ANL01FL = 'Y' and TRTEMFL = 'Y';

    /* 絶対値カテゴリ */
    if AVAL > 500 then abs_cat = '>500 msec';
    else if AVAL > 480 then abs_cat = '>480 msec';
    else if AVAL > 450 then abs_cat = '>450 msec';
    else abs_cat = '<=450 msec';

    /* 変化量カテゴリ */
    if CHG > 60 then chg_cat = '>60 msec increase';
    else if CHG > 30 then chg_cat = '>30 msec increase';
    else chg_cat = '<=30 msec';
run;

/* 投与後の最悪値でユニークカウント */
proc sql;
    create table eg_worst as
    select USUBJID, TRT01A, PARAMCD,
           max(AVAL) as worst_aval,
           max(CHG) as worst_chg
    from adam.adeg
    where SAFFL = 'Y' and PARAMCD = 'QTCF'
      and ANL01FL = 'Y' and TRTEMFL = 'Y'
    group by USUBJID, TRT01A, PARAMCD;
quit;</code></pre>
</div>
`,
            quiz: [
                {
                    id: "q704_1",
                    type: "choice",
                    question: "ICH E14ガイドラインにおいて、QTcF延長で重大な安全性シグナルとされる閾値はどれですか？",
                    options: [
                        ">400 msec",
                        ">450 msec",
                        ">480 msec",
                        ">500 msec"
                    ],
                    answer: 3,
                    explanation: "ICH E14ガイドラインでは、QTcF >500 msecは重大な安全性シグナルとされます。>450, >480, >500の3段階でカテゴリ別集計を報告します。"
                },
                {
                    id: "q704_2",
                    type: "choice",
                    question: "バイタルサインデータで使用するADaMデータセットはどれですか？",
                    options: [
                        "ADLB",
                        "ADVS",
                        "ADEG",
                        "ADSL"
                    ],
                    answer: 1,
                    explanation: "バイタルサインデータにはADVS（Analysis Dataset for Vital Signs）を使用します。心電図データにはADEG（Analysis Dataset for ECG）を使用します。"
                },
                {
                    id: "q704_3",
                    type: "choice",
                    question: "QT間隔の補正法として、心拍数による補正を行う「Fridericia補正」の略称はどれですか？",
                    options: [
                        "QTcB",
                        "QTcF",
                        "QTcL",
                        "QTcS"
                    ],
                    answer: 1,
                    explanation: "QTcF（Fridericia's corrected QT interval）はFridericiaの補正法によるQT間隔です。QTcB（Bazett補正）と比較して、心拍数への依存性が低いとされます。"
                },
                {
                    id: "q704_4",
                    type: "choice",
                    question: "QTc延長のベースラインからの変化量で、臨床的に重要とされる増加幅はどれですか？",
                    options: [
                        ">10 msec",
                        ">20 msec",
                        ">30 msec",
                        ">60 msec"
                    ],
                    answer: 3,
                    explanation: "ΔQTcF >60 msecは臨床的に重要な延長とされます。>30 msecと>60 msecの2段階でカテゴリ別集計を報告するのが一般的です。"
                },
                {
                    id: "q704_5",
                    type: "fill",
                    question: "QTc延長に伴う致死的不整脈の名称は「Torsades de _____」です。（フランス語、アルファベット7文字）",
                    answer: "Pointes",
                    explanation: "Torsades de Pointes（TdP、トルサード・ド・ポアント）は、QT延長に伴う特徴的な多形性心室頻拍で、致死的な不整脈です。"
                }
            ]
        }
    ]
};
