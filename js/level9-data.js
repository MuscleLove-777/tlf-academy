/* ============================================
   TLF Academy - Level 9: Figures（図）の作成
   ============================================ */

const LEVEL9_DATA = {
    id: 9,
    title: "Figures（図）の作成",
    icon: "📈",
    description: "臨床試験で必要な主要な図の作成方法とベストプラクティスを学ぶ",
    modules: [
        {
            id: 901,
            title: "Kaplan-Meier生存曲線",
            duration: "30分",
            content: `
<h2>Kaplan-Meier生存曲線の概要</h2>
<p>Kaplan-Meier生存曲線（KM曲線）は、臨床試験において<strong>Time-to-Event（イベント発生までの時間）</strong>データを視覚化する最も重要な図です。<strong>ADTTE</strong>（Analysis Dataset for Time-to-Event）データセットを使用します。</p>

<div class="info-box tip">
<div class="info-box-title">💡 ポイント</div>
<p>Kaplan-Meier法は、センサリング（打ち切り）データを適切に扱うことができるノンパラメトリックな生存解析法です。各時点でのイベント発生確率を逐次的に計算し、累積生存率を推定します。</p>
</div>

<h3>ADTTEデータセットの主要変数</h3>
<table>
<thead>
<tr><th>変数名</th><th>説明</th><th>例</th></tr>
</thead>
<tbody>
<tr><td>PARAMCD</td><td>解析パラメータコード</td><td>OS（Overall Survival）、PFS（Progression-Free Survival）</td></tr>
<tr><td>AVAL</td><td>解析値（イベントまでの時間）</td><td>月数、日数</td></tr>
<tr><td>CNSR</td><td>センサリングフラグ</td><td>0=イベント発生、1=センサリング</td></tr>
<tr><td>EVNTDESC</td><td>イベントの説明</td><td>Death、Progressive Disease</td></tr>
<tr><td>CNSDTDSC</td><td>センサリング理由</td><td>Last Known Alive、End of Study</td></tr>
<tr><td>STARTDT</td><td>Time-to-Eventの起算日</td><td>無作為化日</td></tr>
<tr><td>ADT</td><td>イベント/センサリング日</td><td>イベント発生日またはセンサリング日</td></tr>
</tbody>
</table>

<h3>KM曲線の構成要素</h3>
<p>完全なKM曲線には以下の構成要素が必要です。</p>

<ol>
<li><strong>ステップ関数</strong>：投与群ごとの生存曲線（異なる色/線種で区別）</li>
<li><strong>センサリングマーク</strong>：打ち切りデータの位置を示すマーク（通常「+」記号）</li>
<li><strong>信頼区間</strong>：95%信頼区間（シェーディングまたは破線）</li>
<li><strong>At-Riskテーブル</strong>：各時点でのリスク集合の被験者数</li>
<li><strong>中央値の表示</strong>：生存期間の中央値（水平線と垂直線で図上に表示）</li>
<li><strong>Log-rank検定のp値</strong>：投与群間比較の検定結果</li>
<li><strong>ハザード比と95% CI</strong>：Cox比例ハザードモデルの結果</li>
</ol>

<h3>At-Riskテーブル</h3>
<p>KM曲線の下部に表示されるAt-Riskテーブルは、各時点で「まだイベントが発生しておらず、かつセンサリングもされていない」被験者数を示します。</p>

<table>
<thead>
<tr><th>Number at Risk</th><th>0</th><th>3</th><th>6</th><th>9</th><th>12</th><th>15</th><th>18 (months)</th></tr>
</thead>
<tbody>
<tr><td>Placebo</td><td>100</td><td>92</td><td>78</td><td>65</td><td>52</td><td>38</td><td>25</td></tr>
<tr><td>Drug A</td><td>102</td><td>98</td><td>90</td><td>82</td><td>72</td><td>60</td><td>48</td></tr>
</tbody>
</table>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* Kaplan-Meier生存曲線の作成 */
/* Step 1: 生存解析の実行 */
proc lifetest data=adam.adtte plots=none
    outsurv=km_est method=km;
    where ITTFL = 'Y' and PARAMCD = 'OS';
    time AVAL * CNSR(1);
    strata TRT01P;
run;

/* Step 2: PROC LIFETEST で KM曲線 + At-Risk テーブル */
ods graphics on / width=10in height=6in imagefmt=png;

proc lifetest data=adam.adtte
    plots=survival(atrisk(outside maxlen=13)
                   cl test cb=hw)
    notable;
    where ITTFL = 'Y' and PARAMCD = 'OS';
    time AVAL * CNSR(1);
    strata TRT01P / test=logrank;
run;

ods graphics off;

/* Step 3: PROC SGPLOT による高度なカスタマイズ */
proc sgplot data=km_est;
    title "Kaplan-Meier Estimate of Overall Survival";
    title2 "ITT Population";

    step x=AVAL y=SURVIVAL / group=STRATUM
        lineattrs=(thickness=2)
        name='km';

    /* センサリングマーク */
    scatter x=AVAL y=SURVIVAL / group=STRATUM
        markerattrs=(symbol=plus size=8);

    /* 参照線（中央値） */
    refline 0.5 / axis=y lineattrs=(pattern=dot color=gray);

    xaxis label="Time (Months)" values=(0 to 24 by 3);
    yaxis label="Survival Probability" values=(0 to 1 by 0.1);

    keylegend 'km' / location=inside position=topright;
run;</code></pre>
</div>

<div class="info-box warning">
<div class="info-box-title">⚠️ KM曲線の品質チェック</div>
<ul>
<li>Y軸は0から1（または0%から100%）で固定し、途中でスケールを変えない</li>
<li>センサリングマークが正しい位置に表示されていることを確認</li>
<li>At-Riskテーブルの数値がデータと一致していることをダブルチェック</li>
<li>信頼区間のシェーディングが重なる部分の視認性を確認</li>
<li>ハザード比とp値の表示位置が曲線と重ならないようにする</li>
</ul>
</div>

<div class="info-box tip">
<div class="info-box-title">💡 センサリングの理由</div>
<p>一般的なセンサリング理由：</p>
<ul>
<li>試験終了時にイベント未発生（Administrative censoring）</li>
<li>追跡不能（Lost to follow-up）</li>
<li>同意撤回（Withdrew consent）</li>
<li>他の治療への変更（Switch to other therapy）</li>
</ul>
</div>
`,
            quiz: [
                {
                    id: "q901_1",
                    type: "choice",
                    question: "ADTTEにおけるCNSR変数で「イベント発生」を示す値はどれですか？",
                    options: [
                        "0",
                        "1",
                        "'Y'",
                        "'EVENT'"
                    ],
                    answer: 0,
                    explanation: "ADTTEのCNSR（Censoring Flag）では、0がイベント発生、1がセンサリング（打ち切り）を示します。"
                },
                {
                    id: "q901_2",
                    type: "choice",
                    question: "KM曲線の投与群間比較に使用される標準的な検定はどれですか？",
                    options: [
                        "t検定",
                        "カイ二乗検定",
                        "Log-rank検定",
                        "F検定"
                    ],
                    answer: 2,
                    explanation: "Log-rank検定はKM曲線（生存曲線）の投与群間比較に使用される標準的な検定方法です。生存時間分布の全体的な差を検定します。"
                },
                {
                    id: "q901_3",
                    type: "choice",
                    question: "KM曲線でセンサリングデータを示すために一般的に使用されるマーカーはどれですか？",
                    options: [
                        "丸（○）",
                        "三角（△）",
                        "プラス（+）",
                        "星（★）"
                    ],
                    answer: 2,
                    explanation: "KM曲線ではセンサリングデータをプラス記号（+）で示すのが国際的な慣例です。センサリングされた時点で曲線上にマークが付きます。"
                },
                {
                    id: "q901_4",
                    type: "choice",
                    question: "KM曲線の下部に表示されるAt-Riskテーブルが示す情報として正しいものはどれですか？",
                    options: [
                        "各時点でイベントが発生した被験者数",
                        "各時点でセンサリングされた被験者数",
                        "各時点でまだリスク集合に含まれる被験者数",
                        "各時点での累積イベント数"
                    ],
                    answer: 2,
                    explanation: "At-Riskテーブルは各時点でまだリスク集合に含まれる（イベントもセンサリングも発生していない）被験者数を示します。"
                },
                {
                    id: "q901_5",
                    type: "fill",
                    question: "Kaplan-Meier生存曲線の作成に使用するSASプロシジャは「PROC _____」です。（アルファベット8文字）",
                    answer: "LIFETEST",
                    explanation: "PROC LIFETESTはSASでKaplan-Meier法による生存解析を実行し、生存曲線を作成するプロシジャです。Log-rank検定やWilcoxon検定も同時に実行できます。"
                }
            ]
        },
        {
            id: 902,
            title: "Forest Plot",
            duration: "30分",
            content: `
<h2>Forest Plotの概要</h2>
<p>Forest Plot（フォレストプロット）は、サブグループ解析の結果を視覚的に表現する図です。各サブグループにおけるハザード比（HR）またはオッズ比（OR）とその95%信頼区間を横向きの線分と点で表示し、治療効果の一貫性を評価するために使用されます。</p>

<div class="info-box tip">
<div class="info-box-title">💡 ポイント</div>
Forest Plotは、メタアナリシスやサブグループ解析で広く使用される視覚化手法です。各サブグループの効果推定値が「帰無仮説の線（HR=1またはOR=1）」に対してどの位置にあるかを直感的に把握できます。
</div>

<h3>Forest Plotの構成要素</h3>
<table>
<thead>
<tr><th>構成要素</th><th>説明</th><th>視覚表現</th></tr>
</thead>
<tbody>
<tr><td>点推定値</td><td>HR/ORの推定値</td><td>正方形（サンプルサイズに比例した大きさ）</td></tr>
<tr><td>信頼区間</td><td>95% CI</td><td>水平線分</td></tr>
<tr><td>帰無仮説の線</td><td>HR=1 or OR=1</td><td>垂直破線</td></tr>
<tr><td>全体効果</td><td>全体のHR/OR</td><td>ダイヤモンド（菱形）</td></tr>
<tr><td>サブグループラベル</td><td>各サブグループ名</td><td>左側のテキスト</td></tr>
<tr><td>数値データ</td><td>n, HR, CI, p-value</td><td>右側のテキスト列</td></tr>
<tr><td>Interaction P-value</td><td>交互作用p値</td><td>各サブグループカテゴリ下のテキスト</td></tr>
</tbody>
</table>

<h3>Forest Plotのレイアウト</h3>
<p>典型的なForest Plotは左側にサブグループ情報、中央にグラフ、右側に数値を配置します。</p>

<table>
<thead>
<tr><th>Subgroup</th><th>Placebo<br>n/N</th><th>Drug A<br>n/N</th><th>[←Drug A better | Placebo better→]</th><th>HR (95% CI)</th><th>P-int</th></tr>
</thead>
<tbody>
<tr><td><strong>Overall</strong></td><td>45/100</td><td>30/102</td><td>◆ 0.62</td><td>0.62 (0.40, 0.95)</td><td></td></tr>
<tr><td><strong>Age</strong></td><td></td><td></td><td></td><td></td><td>0.45</td></tr>
<tr><td>&nbsp;&nbsp;&lt;65</td><td>30/70</td><td>18/72</td><td>■—— 0.55</td><td>0.55 (0.32, 0.96)</td><td></td></tr>
<tr><td>&nbsp;&nbsp;≥65</td><td>15/30</td><td>12/30</td><td>——■—— 0.78</td><td>0.78 (0.37, 1.65)</td><td></td></tr>
<tr><td><strong>Sex</strong></td><td></td><td></td><td></td><td></td><td>0.82</td></tr>
<tr><td>&nbsp;&nbsp;Male</td><td>25/58</td><td>16/55</td><td>■—— 0.60</td><td>0.60 (0.33, 1.10)</td><td></td></tr>
<tr><td>&nbsp;&nbsp;Female</td><td>20/42</td><td>14/47</td><td>■—— 0.64</td><td>0.64 (0.34, 1.22)</td><td></td></tr>
</tbody>
</table>

<div class="info-box warning">
<div class="info-box-title">⚠️ Forest Plotの解釈</div>
<ul>
<li><strong>HR &lt; 1</strong>：実薬群が有利（イベントリスクが低い）</li>
<li><strong>HR = 1</strong>：治療効果なし</li>
<li><strong>HR &gt; 1</strong>：プラセボ群が有利</li>
<li>信頼区間がHR=1の線をまたがない場合、統計的に有意</li>
<li>Interaction P-value &lt; 0.10 の場合、サブグループ間で治療効果が異なる可能性</li>
</ul>
</div>

<h3>SASによるForest Plot作成</h3>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* Forest Plot用データの準備 */
/* Step 1: 各サブグループのHRをCox回帰で算出 */
%macro cox_subgroup(subgrp=, subgrp_val=, ord=);
    proc phreg data=adam.adtte nosummary;
        where ITTFL = 'Y' and PARAMCD = 'OS'
          and &subgrp = "&subgrp_val";
        class TRT01P(ref='Placebo');
        model AVAL * CNSR(1) = TRT01P;
        hazardratio TRT01P;
        ods output HazardRatios=hr_&ord;
    run;

    data hr_&ord;
        set hr_&ord;
        length subgroup $50;
        subgroup = "&subgrp: &subgrp_val";
        ord = &ord;
    run;
%mend;

%cox_subgroup(subgrp=AGEGR1, subgrp_val=<65, ord=1);
%cox_subgroup(subgrp=AGEGR1, subgrp_val=>=65, ord=2);
%cox_subgroup(subgrp=SEX, subgrp_val=M, ord=3);
%cox_subgroup(subgrp=SEX, subgrp_val=F, ord=4);

/* Step 2: データの統合 */
data forest_data;
    set hr_1 - hr_4;
    rename HazardRatio=hr WaldLower=lower WaldUpper=upper;
run;

/* Step 3: PROC SGPLOT でForest Plot作成 */
proc sgplot data=forest_data noautolegend;
    title "Forest Plot of Overall Survival by Subgroup";
    title2 "ITT Population";

    scatter y=subgroup x=hr /
        markerattrs=(symbol=squarefilled size=10 color=navy)
        xerrorlower=lower xerrorupper=upper
        errorbarattrs=(thickness=2 color=navy);

    refline 1 / axis=x lineattrs=(pattern=dash color=gray)
        label="No Effect";

    xaxis label="Hazard Ratio (95% CI)"
        type=log logbase=2
        values=(0.1 0.25 0.5 1 2 4);
    yaxis label="" discreteorder=data reverse;
run;</code></pre>
</div>

<div class="info-box tip">
<div class="info-box-title">💡 Forest Plotのベストプラクティス</div>
<ul>
<li>X軸は対数スケールを使用（ハザード比/オッズ比は対数正規分布に従うため）</li>
<li>正方形の大きさをサンプルサイズに比例させる（視覚的な重み付け）</li>
<li>「Favors Treatment」「Favors Control」のラベルを軸の下に表示</li>
<li>全体効果をダイヤモンドで最下部に表示</li>
<li>サブグループ解析表の数値と完全に一致していることを確認</li>
</ul>
</div>
`,
            quiz: [
                {
                    id: "q902_1",
                    type: "choice",
                    question: "Forest Plotで帰無仮説の線（no effect line）に対応する値として正しいものはどれですか？",
                    options: [
                        "HR = 0",
                        "HR = 0.5",
                        "HR = 1",
                        "HR = 2"
                    ],
                    answer: 2,
                    explanation: "ハザード比（HR）= 1は治療効果なし（帰無仮説）を示します。Forest Plotではこの位置に垂直な参照線を引きます。"
                },
                {
                    id: "q902_2",
                    type: "choice",
                    question: "Forest PlotのX軸に推奨されるスケールはどれですか？",
                    options: [
                        "線形スケール",
                        "対数スケール",
                        "平方根スケール",
                        "逆数スケール"
                    ],
                    answer: 1,
                    explanation: "Forest PlotのX軸には対数スケールが推奨されます。ハザード比やオッズ比は対数正規分布に従い、対数スケールでは信頼区間が左右対称に表示されます。"
                },
                {
                    id: "q902_3",
                    type: "choice",
                    question: "Forest Plotで各サブグループの点推定値を示す正方形の大きさは何に比例させるのが一般的ですか？",
                    options: [
                        "p値の逆数",
                        "ハザード比の値",
                        "サンプルサイズ",
                        "信頼区間の幅"
                    ],
                    answer: 2,
                    explanation: "正方形の大きさはサンプルサイズに比例させるのが一般的です。これにより、大きなサブグループのデータが視覚的に強調され、情報量の違いを直感的に伝えます。"
                },
                {
                    id: "q902_4",
                    type: "choice",
                    question: "Forest Plotでハザード比を算出するために使用するSASプロシジャはどれですか？",
                    options: [
                        "PROC LIFETEST",
                        "PROC PHREG",
                        "PROC MIXED",
                        "PROC LOGISTIC"
                    ],
                    answer: 1,
                    explanation: "PROC PHREG（Cox比例ハザード回帰）はハザード比とその信頼区間を算出するために使用されます。PROC LIFETESTはKM推定とlog-rank検定に使用されます。"
                },
                {
                    id: "q902_5",
                    type: "fill",
                    question: "Forest Plotで全体効果を表示する際に使用される図形は「_____」（菱形）です。（カタカナ5文字）",
                    answer: "ダイヤモンド",
                    explanation: "ダイヤモンド（菱形）は全体効果（Overall Effect）を表示するために使用されます。菱形の中心が点推定値、横幅が信頼区間を表します。"
                }
            ]
        },
        {
            id: 903,
            title: "箱ひげ図・散布図",
            duration: "25分",
            content: `
<h2>箱ひげ図と散布図</h2>
<p>箱ひげ図（Box Plot）と散布図（Scatter Plot）は、検査値やバイタルサインの分布や推移を視覚化するために臨床試験で頻繁に使用される図です。</p>

<h3>箱ひげ図（Box Plot）</h3>
<p>箱ひげ図は、データの分布を四分位数で要約した図です。臨床試験では、Visit別・投与群別の検査値の推移を表示するのに使用されます。</p>

<div class="info-box tip">
<div class="info-box-title">💡 箱ひげ図の構成要素</div>
<ul>
<li><strong>箱（Box）</strong>：Q1（25パーセンタイル）からQ3（75パーセンタイル）</li>
<li><strong>中央線</strong>：中央値（Q2、50パーセンタイル）</li>
<li><strong>ひげ（Whiskers）</strong>：Q1 - 1.5×IQR から Q3 + 1.5×IQR の範囲</li>
<li><strong>外れ値</strong>：ひげの外側のデータ点（個別にプロット）</li>
<li><strong>IQR</strong>：四分位範囲 = Q3 - Q1</li>
</ul>
</div>

<h3>Visit別箱ひげ図の例</h3>
<p>Visit別の検査値推移を投与群ごとに箱ひげ図で表示する場合のレイアウト：</p>
<ul>
<li>X軸：Visit（Baseline, Week 4, Week 8, Week 12, ...）</li>
<li>Y軸：検査値（例: ALT (U/L)）</li>
<li>色/パターン：投与群ごとに異なる色</li>
<li>各Visitで投与群を横に並べて表示（grouped box plot）</li>
</ul>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* Visit別箱ひげ図 */
proc sgplot data=adam.adlb;
    where SAFFL = 'Y' and PARAMCD = 'ALT'
      and ANL01FL = 'Y' and AVISIT ne '';

    title "Box Plot of ALT by Visit and Treatment";
    title2 "Safety Population";

    vbox AVAL / category=AVISIT group=TRT01A
        lineattrs=(thickness=1)
        whiskerattrs=(thickness=1)
        meanattrs=(symbol=diamond size=6)
        outlierattrs=(symbol=circle size=4);

    xaxis label="Visit" discreteorder=data;
    yaxis label="ALT (U/L)";

    keylegend / location=outside position=bottom;
run;

/* ベースラインからの変化量の箱ひげ図 */
proc sgplot data=adam.adlb;
    where SAFFL = 'Y' and PARAMCD = 'ALT'
      and ANL01FL = 'Y' and AVISITN > 0;

    title "Box Plot of Change from Baseline in ALT";

    vbox CHG / category=AVISIT group=TRT01A
        lineattrs=(thickness=1)
        meanattrs=(symbol=diamond size=6);

    refline 0 / axis=y lineattrs=(pattern=dash color=gray);

    xaxis label="Visit";
    yaxis label="Change from Baseline in ALT (U/L)";
run;</code></pre>
</div>

<h3>散布図（Scatter Plot）</h3>
<p>散布図は二つの連続変数の関係を視覚化する図です。臨床試験では以下の用途で使用されます。</p>

<table>
<thead>
<tr><th>用途</th><th>X軸</th><th>Y軸</th><th>追加要素</th></tr>
</thead>
<tbody>
<tr><td>ベースライン vs 投与後</td><td>ベースライン値</td><td>投与後最終値</td><td>Y=X参照線</td></tr>
<tr><td>ベースライン vs 変化量</td><td>ベースライン値</td><td>変化量（CHG）</td><td>Y=0参照線</td></tr>
<tr><td>薬物動態</td><td>濃度</td><td>QTc変化量</td><td>回帰直線</td></tr>
<tr><td>バイオマーカー</td><td>ベースラインマーカー</td><td>反応</td><td>カットオフ線</td></tr>
</tbody>
</table>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* ベースライン vs 変化量の散布図 */
proc sgplot data=adam.adlb;
    where SAFFL = 'Y' and PARAMCD = 'ALT'
      and ANL01FL = 'Y' and AVISIT = 'Week 12';

    title "Scatter Plot: Baseline vs Change from Baseline in ALT";
    title2 "Week 12 - Safety Population";

    scatter x=BASE y=CHG / group=TRT01A
        markerattrs=(size=6)
        transparency=0.3;

    /* 参照線 */
    refline 0 / axis=y lineattrs=(pattern=dash color=gray)
        label="No Change";

    /* 回帰直線 */
    reg x=BASE y=CHG / group=TRT01A
        lineattrs=(thickness=1)
        nomarkers;

    xaxis label="Baseline ALT (U/L)";
    yaxis label="Change from Baseline in ALT (U/L)";
    keylegend / location=outside position=bottom;
run;

/* ベースライン vs 投与後の散布図 */
proc sgplot data=adam.adlb;
    where SAFFL = 'Y' and PARAMCD = 'ALT'
      and ANL01FL = 'Y' and ABLFL ne 'Y'
      and AVISIT = 'End of Treatment';

    title "Scatter Plot: Baseline vs Post-baseline ALT";

    scatter x=BASE y=AVAL / group=TRT01A
        markerattrs=(size=6)
        transparency=0.3;

    /* Y=X の参照線（変化なしの線） */
    lineparm x=0 y=0 slope=1 /
        lineattrs=(pattern=dash color=gray)
        clip;

    /* ULNの参照線 */
    refline 56 / axis=x lineattrs=(pattern=dot color=red)
        label="ULN";
    refline 56 / axis=y lineattrs=(pattern=dot color=red);

    xaxis label="Baseline ALT (U/L)";
    yaxis label="Post-baseline ALT (U/L)";
run;</code></pre>
</div>

<h3>外れ値の表示</h3>
<div class="info-box warning">
<div class="info-box-title">⚠️ 外れ値の扱い</div>
<ul>
<li>箱ひげ図では外れ値を個別の点として表示（除外しない）</li>
<li>散布図では外れ値がプロット範囲外になる場合、軸のスケールを調整するか注記を追加</li>
<li>臨床的に重要な外れ値は、被験者IDでラベル付けすることがある</li>
<li>外れ値の除外・含有は事前にSAPで定義しておく</li>
</ul>
</div>
`,
            quiz: [
                {
                    id: "q903_1",
                    type: "choice",
                    question: "箱ひげ図のひげ（Whiskers）の一般的な範囲として正しいものはどれですか？",
                    options: [
                        "最小値から最大値",
                        "Mean ± 2SD",
                        "Q1 - 1.5×IQR から Q3 + 1.5×IQR",
                        "5パーセンタイルから95パーセンタイル"
                    ],
                    answer: 2,
                    explanation: "箱ひげ図のひげは通常、Q1 - 1.5×IQR（四分位範囲）からQ3 + 1.5×IQRの範囲で描かれ、この範囲外のデータは外れ値として個別にプロットされます。"
                },
                {
                    id: "q903_2",
                    type: "choice",
                    question: "ベースラインvs投与後の散布図で、変化なしを示す参照線として正しいものはどれですか？",
                    options: [
                        "Y = 0",
                        "X = 0",
                        "Y = X",
                        "Y = 2X"
                    ],
                    answer: 2,
                    explanation: "ベースラインvs投与後の散布図では、Y=X（45度の対角線）が変化なしの参照線です。この線より上は増加、下は減少を示します。"
                },
                {
                    id: "q903_3",
                    type: "choice",
                    question: "SASで箱ひげ図を作成する際に使用するSGPLOTのステートメントはどれですか？",
                    options: [
                        "hbox",
                        "vbox",
                        "boxplot",
                        "whisker"
                    ],
                    answer: 1,
                    explanation: "PROC SGPLOTではvbox（垂直箱ひげ図）またはhbox（水平箱ひげ図）ステートメントを使用します。category=でグループ化変数を指定します。"
                },
                {
                    id: "q903_4",
                    type: "choice",
                    question: "箱ひげ図の箱（Box）の中央の線が示す統計量はどれですか？",
                    options: [
                        "平均値（Mean）",
                        "中央値（Median）",
                        "最頻値（Mode）",
                        "幾何平均値"
                    ],
                    answer: 1,
                    explanation: "箱ひげ図の箱内の中央線は中央値（Median、50パーセンタイル）を示します。平均値はダイヤモンドマーカーで別途表示されることがあります。"
                },
                {
                    id: "q903_5",
                    type: "fill",
                    question: "箱ひげ図で箱の高さ（Q3-Q1）を表す統計量は「___」（四分位範囲）です。（アルファベット3文字）",
                    answer: "IQR",
                    explanation: "IQR（Interquartile Range、四分位範囲）はQ3（75パーセンタイル）- Q1（25パーセンタイル）で計算され、箱ひげ図の箱の高さを決定します。"
                }
            ]
        },
        {
            id: 904,
            title: "その他の重要な図",
            duration: "25分",
            content: `
<h2>その他の重要な臨床試験図表</h2>
<p>Kaplan-Meier曲線、Forest Plot、箱ひげ図以外にも、臨床試験報告書で重要な役割を果たす図があります。ここでは、ウォーターフォールプロット、スパゲッティプロット、経時変化折れ線グラフについて解説します。</p>

<h3>ウォーターフォールプロット（Waterfall Plot）</h3>
<p>ウォーターフォールプロットは、各被験者の最大腫瘍縮小率（Best Percentage Change）を棒グラフで表示する図で、主に<strong>腫瘍学（オンコロジー）</strong>の臨床試験で使用されます。</p>

<div class="info-box tip">
<div class="info-box-title">💡 ポイント</div>
<p>ウォーターフォールプロットの特徴：</p>
<ul>
<li>各棒は1人の被験者を表す</li>
<li>棒は変化率の大きい順（左から右へ）にソート</li>
<li>負の値（下向き）は腫瘍縮小、正の値（上向き）は腫瘍増大を示す</li>
<li>RECIST基準の参照線（-30%：部分奏効、+20%：進行）を表示</li>
</ul>
</div>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* ウォーターフォールプロットの作成 */
/* Step 1: 各被験者の最大腫瘍縮小率を取得 */
proc sql;
    create table waterfall_data as
    select USUBJID, TRT01A,
           min(PCHG) as best_pchg  /* 最大縮小率 */
    from adam.adtr
    where ITTFL = 'Y' and PARAMCD = 'SUMDIAM'
      and AVISIT ne 'Baseline'
    group by USUBJID, TRT01A
    order by calculated best_pchg;
quit;

/* Step 2: ソート順の設定 */
data waterfall_data;
    set waterfall_data;
    ord = _n_;

    /* 奏効カテゴリの色分け */
    length response $20;
    if best_pchg <= -30 then response = 'PR/CR';
    else if best_pchg <= 20 then response = 'SD';
    else response = 'PD';
run;

/* Step 3: PROC SGPLOT で描画 */
proc sgplot data=waterfall_data;
    title "Waterfall Plot of Best Percentage Change in Tumor Size";
    title2 "ITT Population";

    vbar ord / response=best_pchg group=response
        barwidth=0.8
        groupdisplay=cluster;

    /* RECIST参照線 */
    refline -30 / axis=y lineattrs=(pattern=dash color=green)
        label="-30% (PR threshold)";
    refline 20 / axis=y lineattrs=(pattern=dash color=red)
        label="+20% (PD threshold)";
    refline 0 / axis=y lineattrs=(color=black);

    xaxis label="Subjects (ordered by best response)"
        display=(nolabel noticks novalues);
    yaxis label="Best Percentage Change from Baseline (%)"
        values=(-100 to 100 by 20);
run;</code></pre>
</div>

<h3>スパゲッティプロット（Spaghetti Plot）</h3>
<p>スパゲッティプロットは、各被験者の経時的なデータの推移を個別の折れ線で表示する図です。名前の由来は、多数の折れ線が重なり合ってスパゲッティのように見えることに由来します。</p>

<table>
<thead>
<tr><th>用途</th><th>X軸</th><th>Y軸</th><th>特徴</th></tr>
</thead>
<tbody>
<tr><td>検査値の個人推移</td><td>Visit / 時間</td><td>検査値</td><td>異常値の被験者を識別</td></tr>
<tr><td>腫瘍サイズ推移</td><td>Visit / 時間</td><td>ベースラインからの変化率</td><td>Spider Plot とも呼ぶ</td></tr>
<tr><td>バイタルサイン推移</td><td>Visit / 時間</td><td>測定値</td><td>パターンの識別</td></tr>
</tbody>
</table>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* スパゲッティプロット（個人別推移図） */
proc sgplot data=adam.adlb;
    where SAFFL = 'Y' and PARAMCD = 'ALT'
      and ANL01FL = 'Y' and TRT01A = 'Drug A';

    title "Individual ALT Values Over Time - Drug A";
    title2 "Safety Population";

    series x=AVISITN y=AVAL / group=USUBJID
        lineattrs=(thickness=0.5 pattern=solid)
        transparency=0.7
        name='individual';

    /* ULN参照線 */
    refline 56 / axis=y lineattrs=(pattern=dash color=red
        thickness=2) label="ULN";

    /* 3×ULN参照線 */
    refline 168 / axis=y lineattrs=(pattern=dash color=darkred
        thickness=2) label="3xULN";

    xaxis label="Visit" values=(0 to 12 by 2);
    yaxis label="ALT (U/L)" type=log logbase=10;
run;</code></pre>
</div>

<h3>経時変化折れ線グラフ（Mean Plot）</h3>
<p>経時変化折れ線グラフは、Visit別の平均値（±SE/SD）を投与群ごとに折れ線で表示する図です。</p>

<div class="info-box tip">
<div class="info-box-title">💡 Mean Plot の構成要素</div>
<ul>
<li><strong>折れ線</strong>：各投与群のVisit別平均値を結ぶ線</li>
<li><strong>エラーバー</strong>：標準誤差（SE）または標準偏差（SD）</li>
<li><strong>マーカー</strong>：各データ点を示すシンボル</li>
<li><strong>参照線</strong>：ベースラインや臨床的カットオフ値</li>
</ul>
</div>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* 経時変化折れ線グラフ（Mean ± SE） */
/* Step 1: 要約統計量の算出 */
proc means data=adam.adlb nway noprint;
    where SAFFL = 'Y' and PARAMCD = 'ALT' and ANL01FL = 'Y';
    class TRT01A AVISITN;
    var CHG;
    output out=mean_data
        n=n mean=mean stderr=se
        lclm=lower uclm=upper;
run;

/* Step 2: PROC SGPLOT で描画 */
proc sgplot data=mean_data;
    title "Mean Change from Baseline in ALT Over Time";
    title2 "Safety Population";

    /* 群ごとに少しずらして重なりを回避 */
    highlow x=AVISITN low=lower high=upper / group=TRT01A
        type=bar barwidth=0.3;

    series x=AVISITN y=mean / group=TRT01A
        lineattrs=(thickness=2)
        markers markerattrs=(size=8)
        name='trt';

    refline 0 / axis=y lineattrs=(pattern=dash color=gray);

    xaxis label="Visit (Week)" values=(0 to 12 by 2);
    yaxis label="Mean Change from Baseline in ALT (U/L)";

    keylegend 'trt' / location=outside position=bottom;
run;</code></pre>
</div>

<div class="info-box warning">
<div class="info-box-title">⚠️ 図の品質チェックリスト</div>
<ul>
<li>軸のラベルと単位が正しいか</li>
<li>凡例が図の内容と一致しているか</li>
<li>色のコントラストが十分か（白黒印刷でも区別可能か）</li>
<li>解像度が印刷品質に十分か（最低300 DPI）</li>
<li>対象集団名がタイトルに含まれているか</li>
<li>出力サイズが報告書のページに収まるか</li>
<li>エラーバーの説明（SE or SD）が脚注にあるか</li>
</ul>
</div>

<div class="info-box danger">
<div class="info-box-title">🚨 よくあるミス</div>
<ul>
<li>ウォーターフォールプロットのソート順が間違っている（変化率順でない）</li>
<li>スパゲッティプロットで被験者数が多すぎて視認性が低い</li>
<li>Mean Plotでエラーバーが標準偏差なのか標準誤差なのか不明確</li>
<li>参照線のラベルが欠落している</li>
<li>投与群の色が他の図と不一致</li>
</ul>
</div>
`,
            quiz: [
                {
                    id: "q904_1",
                    type: "choice",
                    question: "ウォーターフォールプロットで-30%の参照線が示すRECIST基準はどれですか？",
                    options: [
                        "完全奏効（CR）の閾値",
                        "部分奏効（PR）の閾値",
                        "病勢安定（SD）の閾値",
                        "病勢進行（PD）の閾値"
                    ],
                    answer: 1,
                    explanation: "RECIST基準では、標的病変の径和がベースラインから30%以上縮小した場合を部分奏効（PR: Partial Response）と判定します。"
                },
                {
                    id: "q904_2",
                    type: "choice",
                    question: "スパゲッティプロットの名前の由来として正しいものはどれですか？",
                    options: [
                        "イタリアの統計学者が考案したため",
                        "多数の個別折れ線が重なりスパゲッティのように見えるため",
                        "データの処理工程がパスタ製造に似ているため",
                        "SASのSPAGHETTIプロシジャを使用するため"
                    ],
                    answer: 1,
                    explanation: "スパゲッティプロットは、多数の被験者の個別折れ線が重なり合い、その見た目がスパゲッティのように見えることに由来しています。"
                },
                {
                    id: "q904_3",
                    type: "choice",
                    question: "経時変化折れ線グラフ（Mean Plot）のエラーバーとして一般的に使用される統計量はどれですか？",
                    options: [
                        "標準偏差（SD）のみ",
                        "標準誤差（SE）のみ",
                        "標準誤差（SE）または標準偏差（SD）",
                        "95%信頼区間のみ"
                    ],
                    answer: 2,
                    explanation: "Mean Plotのエラーバーには標準誤差（SE）または標準偏差（SD）が使用されます。どちらを使用したかは脚注で明記する必要があります。"
                },
                {
                    id: "q904_4",
                    type: "choice",
                    question: "ウォーターフォールプロットの棒のソート順として正しいものはどれですか？",
                    options: [
                        "被験者IDの昇順",
                        "投与群ごとにグループ化",
                        "変化率の大きい順（最大縮小から最大増大）",
                        "イベント発生日の順"
                    ],
                    answer: 2,
                    explanation: "ウォーターフォールプロットでは、変化率の大きい順（最も腫瘍が縮小した被験者から最も増大した被験者へ）にソートするのが標準的です。"
                },
                {
                    id: "q904_5",
                    type: "fill",
                    question: "RECIST基準において、標的病変の径和がベースラインから20%以上増大した場合の判定結果は「__」（病勢進行）です。（アルファベット2文字）",
                    answer: "PD",
                    explanation: "PD（Progressive Disease、病勢進行）は、RECIST基準で標的病変の径和がベースラインまたは最小値から20%以上増大した場合に判定されます。"
                }
            ]
        }
    ]
};
