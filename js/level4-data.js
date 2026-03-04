/* ============================================
   TLF Academy - Level 4: ADaMデータセットの理解
   ============================================ */

const LEVEL4_DATA = {
    id: 4,
    title: "ADaMデータセットの理解",
    icon: "🗃️",
    description: "TLF作成に使用する主要なADaMデータセットの構造と変数を深く理解する",
    modules: [
        {
            id: 401,
            title: "ADSL（Subject Level）",
            duration: "25分",
            content: `
<h2>ADSLの概要</h2>
<p><strong>ADSL（Subject-Level Analysis Dataset）</strong>は、ADaMの中で最も基本的なデータセットです。<strong>1被験者1レコード</strong>の構造を持ち、被験者の人口統計情報、投与群情報、解析対象集団フラグなど、全てのTLFで参照される基本情報を格納します。</p>

<div class="info-box tip">
<div class="info-box-title">💡 ADSLの位置づけ</div>
ADSLは全てのADaMデータセットの「親」であり、他のADaMデータセット（ADAE, ADLB等）はADSLとマージして投与群情報や対象集団フラグを取得します。ADSLの品質は全TLFの品質に直結します。
</div>

<h2>ADSLの主要変数カテゴリ</h2>

<h3>1. 識別変数</h3>
<table>
<thead>
<tr><th>変数名</th><th>ラベル</th><th>例</th></tr>
</thead>
<tbody>
<tr><td><strong>STUDYID</strong></td><td>Study Identifier</td><td>ABC-001</td></tr>
<tr><td><strong>USUBJID</strong></td><td>Unique Subject Identifier</td><td>ABC-001-001-0001</td></tr>
<tr><td><strong>SUBJID</strong></td><td>Subject Identifier</td><td>0001</td></tr>
<tr><td><strong>SITEID</strong></td><td>Study Site Identifier</td><td>001</td></tr>
</tbody>
</table>

<h3>2. 人口統計変数</h3>
<table>
<thead>
<tr><th>変数名</th><th>ラベル</th><th>TLFでの使用</th></tr>
</thead>
<tbody>
<tr><td><strong>AGE</strong></td><td>Age</td><td>連続変数として要約（n, Mean, SD, Median, Min, Max）</td></tr>
<tr><td><strong>AGEGR1</strong></td><td>Age Group 1</td><td>年齢カテゴリ別の集計（例：<65, >=65）</td></tr>
<tr><td><strong>SEX</strong></td><td>Sex</td><td>性別の分布（n, %）</td></tr>
<tr><td><strong>RACE</strong></td><td>Race</td><td>人種の分布（n, %）</td></tr>
<tr><td><strong>ETHNIC</strong></td><td>Ethnicity</td><td>民族の分布（n, %）</td></tr>
<tr><td><strong>WEIGHTBL</strong></td><td>Weight at Baseline</td><td>ベースライン体重の要約</td></tr>
<tr><td><strong>HEIGHTBL</strong></td><td>Height at Baseline</td><td>ベースライン身長の要約</td></tr>
<tr><td><strong>BMIBL</strong></td><td>BMI at Baseline</td><td>ベースラインBMIの要約</td></tr>
</tbody>
</table>

<h3>3. 投与群変数（TRTxxP / TRTxxA）</h3>
<p>TLFの列構成を決定する最も重要な変数です。</p>
<table>
<thead>
<tr><th>変数名</th><th>説明</th><th>使い分け</th></tr>
</thead>
<tbody>
<tr><td><strong>TRT01P</strong></td><td>Planned Treatment for Period 01</td><td>有効性解析（ITT/FAS）</td></tr>
<tr><td><strong>TRT01A</strong></td><td>Actual Treatment for Period 01</td><td>安全性解析（SS）</td></tr>
<tr><td><strong>TRT01PN</strong></td><td>Planned Treatment (Numeric)</td><td>SASでの並び替え用</td></tr>
<tr><td><strong>TRT01AN</strong></td><td>Actual Treatment (Numeric)</td><td>SASでの並び替え用</td></tr>
</tbody>
</table>

<div class="info-box warning">
<div class="info-box-title">⚠️ TRT01P vs TRT01A の使い分け</div>
有効性解析（FAS/ITT）ではTRT01P（計画投与群）、安全性解析（SS）ではTRT01A（実際の投与群）を使用するのが一般的です。仕様書で指定されている投与群変数を必ず確認してください。実際の投与と計画が異なる被験者（例：誤投与）がいる場合、使用する変数によって結果が変わります。
</div>

<h3>4. 対象集団フラグ</h3>
<table>
<thead>
<tr><th>変数名</th><th>説明</th><th>使用するTLF</th></tr>
</thead>
<tbody>
<tr><td><strong>SAFFL</strong></td><td>Safety Population Flag</td><td>安全性Tables/Listings</td></tr>
<tr><td><strong>FASFL</strong></td><td>Full Analysis Set Flag</td><td>有効性Tables/Figures</td></tr>
<tr><td><strong>PPSFL</strong></td><td>Per Protocol Set Flag</td><td>有効性感度分析</td></tr>
<tr><td><strong>PKFL</strong></td><td>PK Population Flag</td><td>PK Tables/Figures</td></tr>
</tbody>
</table>

<h3>5. 日付・期間変数</h3>
<table>
<thead>
<tr><th>変数名</th><th>説明</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td><strong>RFSTDTC</strong></td><td>Subject Reference Start Date</td><td>治験薬初回投与日</td></tr>
<tr><td><strong>RFENDTC</strong></td><td>Subject Reference End Date</td><td>治験薬最終投与日</td></tr>
<tr><td><strong>TRTSDT</strong></td><td>Treatment Start Date (SAS)</td><td>投与開始日（SAS日付）</td></tr>
<tr><td><strong>TRTEDT</strong></td><td>Treatment End Date (SAS)</td><td>投与終了日（SAS日付）</td></tr>
<tr><td><strong>EOSSTT</strong></td><td>End of Study Status</td><td>試験終了状況（COMPLETED/DISCONTINUED）</td></tr>
<tr><td><strong>DCSREAS</strong></td><td>Reason for Discontinuation</td><td>中止理由（Dispositionテーブル）</td></tr>
</tbody>
</table>

<h2>ADSLを使用するTLFの例</h2>
<ul>
<li><strong>Table 14.1.1</strong>：被験者の内訳（Disposition）</li>
<li><strong>Table 14.1.2</strong>：人口統計学的特性</li>
<li><strong>Table 14.1.3</strong>：ベースライン特性</li>
<li><strong>Table 14.1.4</strong>：治験薬曝露状況</li>
</ul>
`,
            quiz: [
                { id: "q401_1", type: "choice", question: "ADSLのレコード構造はどのようになっていますか？", options: ["1パラメータ1レコード", "1イベント1レコード", "1被験者1レコード", "1時点1レコード"], answer: 2, explanation: "ADSLは1被験者1レコードの構造を持つSubject-Levelのデータセットです。" },
                { id: "q401_2", type: "choice", question: "安全性解析で使用する投与群変数はどれですか？", options: ["TRT01P", "TRT01A", "TRT01PN", "TRTP"], answer: 1, explanation: "安全性解析（SS）では実際の投与群を示すTRT01Aを使用するのが一般的です。" },
                { id: "q401_3", type: "choice", question: "FAS（Full Analysis Set）の対象集団フラグ変数はどれですか？", options: ["SAFFL", "FASFL", "PPSFL", "ITTFL"], answer: 1, explanation: "FASFLはFull Analysis Set Flagで、FAS対象の被験者を'Y'で示します。" },
                { id: "q401_4", type: "choice", question: "被験者の試験終了状況を示す変数はどれですか？", options: ["DCSREAS", "EOSSTT", "RFENDTC", "TRTEDT"], answer: 1, explanation: "EOSSTT（End of Study Status）は被験者の試験終了状況（COMPLETED/DISCONTINUED）を示します。" },
                { id: "q401_5", type: "fill", question: "ADSLで治験薬の初回投与日をSAS日付形式で格納する変数名は？（英語6文字で回答）", answer: "TRTSDT", explanation: "TRTSDT（Treatment Start Date）は治験薬の初回投与日をSAS日付形式で格納する変数です。" }
            ]
        },
        {
            id: 402,
            title: "ADAE（Adverse Events）",
            duration: "25分",
            content: `
<h2>ADAEの概要</h2>
<p><strong>ADAE（Analysis Dataset for Adverse Events）</strong>は有害事象の解析用データセットです。安全性TLFの多くがADAEを入力として使用するため、TLFプログラマーにとって最も重要なデータセットの一つです。</p>

<h2>ADAEの構造</h2>
<p>ADAEは<strong>OCCDS（Occurrence Data Structure）</strong>に属し、<strong>1有害事象1レコード</strong>の構造を持ちます。同一被験者に複数の有害事象がある場合、複数レコードが存在します。</p>

<h2>ADAEの主要変数</h2>

<h3>1. コーディング変数</h3>
<table>
<thead>
<tr><th>変数名</th><th>説明</th><th>TLFでの使用</th></tr>
</thead>
<tbody>
<tr><td><strong>AEBODSYS</strong></td><td>Body System or Organ Class（SOC）</td><td>SOC別の大分類集計</td></tr>
<tr><td><strong>AEDECOD</strong></td><td>Dictionary-Derived Term（PT）</td><td>PT別の詳細集計</td></tr>
<tr><td><strong>AEHLT</strong></td><td>High Level Term（HLT）</td><td>階層的な集計に使用</td></tr>
<tr><td><strong>AEHLGT</strong></td><td>High Level Group Term（HLGT）</td><td>階層的な集計に使用</td></tr>
</tbody>
</table>

<div class="info-box tip">
<div class="info-box-title">💡 MedDRA階層構造</div>
有害事象のコーディングにはMedDRA辞書が使用され、以下の5層構造を持ちます：
SOC（器官別大分類）→ HLGT → HLT → PT（基本語）→ LLT（下層語）。
TLFでは主にSOCとPTの2階層で集計します。
</div>

<h3>2. 重症度・重篤性変数</h3>
<table>
<thead>
<tr><th>変数名</th><th>説明</th><th>値</th></tr>
</thead>
<tbody>
<tr><td><strong>AESEV</strong></td><td>Severity</td><td>MILD, MODERATE, SEVERE</td></tr>
<tr><td><strong>AESEVN</strong></td><td>Severity (Numeric)</td><td>1, 2, 3</td></tr>
<tr><td><strong>AESER</strong></td><td>Serious Event</td><td>Y / N</td></tr>
<tr><td><strong>AETOXGR</strong></td><td>Toxicity Grade（CTCAE）</td><td>1, 2, 3, 4, 5</td></tr>
</tbody>
</table>

<h3>3. 因果関係・転帰変数</h3>
<table>
<thead>
<tr><th>変数名</th><th>説明</th><th>TLFでの使用</th></tr>
</thead>
<tbody>
<tr><td><strong>AEREL</strong></td><td>Causality（因果関係）</td><td>治験薬との因果関係別TLF</td></tr>
<tr><td><strong>AEACN</strong></td><td>Action Taken with Study Treatment</td><td>治験薬の措置（用量変更、中止等）</td></tr>
<tr><td><strong>AEOUT</strong></td><td>Outcome</td><td>転帰（回復、未回復等）</td></tr>
<tr><td><strong>AESDTH</strong></td><td>Results in Death</td><td>死亡一覧の作成</td></tr>
</tbody>
</table>

<h3>4. 解析フラグ変数</h3>
<table>
<thead>
<tr><th>変数名</th><th>説明</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td><strong>TRTEMFL</strong></td><td>Treatment-Emergent Flag</td><td>TEAE（治療下発現AE）のフィルタ</td></tr>
<tr><td><strong>AOCCFL</strong></td><td>1st Occurrence within SOC Flag</td><td>SOC内で初回発現のみカウント</td></tr>
<tr><td><strong>AOCPFL</strong></td><td>1st Occurrence of PT Flag</td><td>PT別の被験者数カウント</td></tr>
<tr><td><strong>AOCCPFL</strong></td><td>1st Occ within SOC/PT Flag</td><td>SOC×PT別の被験者数カウント</td></tr>
</tbody>
</table>

<div class="info-box warning">
<div class="info-box-title">⚠️ 発現被験者数のカウント方法</div>
有害事象テーブルでは「イベント数」ではなく「発現被験者数」を集計するのが一般的です。同一被験者が同じPTの有害事象を2回発現した場合、被験者数は1とカウントします。AOCPFLやAOCCPFLのフラグを使用してフィルタリングします。
</div>

<h2>CQ/SMQ（Customized Query / Standardized MedDRA Query）</h2>
<p>特定の安全性トピックに関連する有害事象をグループ化するための仕組みです。</p>

<table>
<thead>
<tr><th>種類</th><th>説明</th><th>例</th></tr>
</thead>
<tbody>
<tr><td><strong>SMQ</strong></td><td>MedDRAが定義する標準クエリ</td><td>肝障害SMQ、心不全SMQ</td></tr>
<tr><td><strong>CQ</strong></td><td>スポンサーが定義するカスタムクエリ</td><td>注目すべき有害事象（AESI）</td></tr>
</tbody>
</table>

<p>ADAEにはSMQ/CQ関連のフラグ変数が追加され、特定の安全性トピックTLFの作成に使用されます。</p>
<ul>
<li><code>SMQxxNAM</code>：SMQ名</li>
<li><code>SMQxxCD</code>：SMQコード</li>
<li><code>CQxxNAM</code>：CQ名</li>
</ul>

<h2>ADAEから作成される主要TLF</h2>
<ol>
<li><strong>TEAE要約テーブル</strong>（SOC/PT別の発現率）</li>
<li><strong>重症度別TEAE要約テーブル</strong></li>
<li><strong>治験薬との因果関係別TEAE要約テーブル</strong></li>
<li><strong>SAE（重篤な有害事象）要約テーブル</strong></li>
<li><strong>投与中止に至ったAE要約テーブル</strong></li>
<li><strong>有害事象個別データListing</strong></li>
<li><strong>SMQ/CQ別の有害事象テーブル</strong></li>
</ol>
`,
            quiz: [
                { id: "q402_1", type: "choice", question: "ADAEで治療下発現有害事象（TEAE）をフィルタするフラグ変数はどれですか？", options: ["AESER", "AESEV", "TRTEMFL", "AOCCFL"], answer: 2, explanation: "TRTEMFL（Treatment-Emergent Flag）はTEAEを識別するフラグ変数です。" },
                { id: "q402_2", type: "choice", question: "MedDRAの階層構造でPT（基本語）の上位に位置する分類はどれですか？", options: ["LLT", "HLT", "SOC", "HLGT"], answer: 1, explanation: "MedDRAの階層はSOC → HLGT → HLT → PT → LLTです。PTの1つ上はHLT（High Level Term）です。" },
                { id: "q402_3", type: "choice", question: "CTCAEに基づく毒性グレードを格納する変数はどれですか？", options: ["AESEV", "AESEVN", "AETOXGR", "AESER"], answer: 2, explanation: "AETOXGR（Toxicity Grade）はCTCAE（Common Terminology Criteria for Adverse Events）に基づく毒性グレードを格納します。" },
                { id: "q402_4", type: "choice", question: "MedDRAが定義する標準的な有害事象グループ化の仕組みを何と呼びますか？", options: ["CQ", "SMQ", "AESI", "FMQ"], answer: 1, explanation: "SMQ（Standardized MedDRA Query）はMedDRAが定義する標準的な有害事象のグループ化クエリです。" },
                { id: "q402_5", type: "fill", question: "ADAEでPT別の初回発現をフィルタするフラグ変数名は？（英語6文字で回答）", answer: "AOCPFL", explanation: "AOCPFL（1st Occurrence of Preferred Term Flag）はPT別の初回発現を示すフラグで、被験者数のカウントに使用します。" }
            ]
        },
        {
            id: 403,
            title: "ADLB/ADVS（検査値・バイタルサイン）",
            duration: "25分",
            content: `
<h2>ADLBとADVSの概要</h2>
<p><strong>ADLB（Analysis Dataset for Laboratory）</strong>と<strong>ADVS（Analysis Dataset for Vital Signs）</strong>は、BDS（Basic Data Structure）に属するデータセットです。検査値やバイタルサインの経時推移を集計するTLFの入力データとなります。</p>

<h2>BDS構造の基本</h2>
<p>BDSは<strong>パラメータ × 時点</strong>ごとにレコードを持つ構造です。</p>
<table>
<thead>
<tr><th>要素</th><th>説明</th><th>例（ADLB）</th></tr>
</thead>
<tbody>
<tr><td>1レコード</td><td>= 1パラメータ × 1時点</td><td>ヘモグロビン × Week 4</td></tr>
<tr><td>PARAM</td><td>パラメータ名</td><td>Hemoglobin (g/dL)</td></tr>
<tr><td>PARAMCD</td><td>パラメータコード</td><td>HGB</td></tr>
<tr><td>AVISIT</td><td>解析Visit名</td><td>Week 4</td></tr>
<tr><td>AVISITN</td><td>解析Visit番号</td><td>4</td></tr>
</tbody>
</table>

<h2>主要な解析変数</h2>
<table>
<thead>
<tr><th>変数名</th><th>説明</th><th>TLFでの使用例</th></tr>
</thead>
<tbody>
<tr><td><strong>AVAL</strong></td><td>Analysis Value（解析値）</td><td>各時点の実測値の要約統計量</td></tr>
<tr><td><strong>BASE</strong></td><td>Baseline Value（ベースライン値）</td><td>ベースライン列の値</td></tr>
<tr><td><strong>CHG</strong></td><td>Change from Baseline（変化量）</td><td>変化量の要約統計量</td></tr>
<tr><td><strong>PCHG</strong></td><td>Percent Change from Baseline（変化率）</td><td>変化率の要約統計量</td></tr>
<tr><td><strong>ANRIND</strong></td><td>Analysis Normal Range Indicator</td><td>正常/異常の分類、シフトテーブル</td></tr>
<tr><td><strong>BNRIND</strong></td><td>Baseline Normal Range Indicator</td><td>ベースライン時点の正常/異常</td></tr>
<tr><td><strong>ANRLO</strong></td><td>Analysis Normal Range Lower Limit</td><td>基準範囲下限</td></tr>
<tr><td><strong>ANRHI</strong></td><td>Analysis Normal Range Upper Limit</td><td>基準範囲上限</td></tr>
</tbody>
</table>

<div class="info-box tip">
<div class="info-box-title">💡 CHGとPCHGの計算</div>
<code>CHG = AVAL - BASE</code>（絶対変化量）、<code>PCHG = (AVAL - BASE) / BASE × 100</code>（変化率%）。これらは既にADaMで計算されており、TLFプログラマーはこれらの変数を直接集計するだけです。ただしBASEが0やmissingの場合のPCHGの扱いに注意が必要です。
</div>

<h2>重要なフラグ変数</h2>
<table>
<thead>
<tr><th>変数名</th><th>説明</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td><strong>ABLFL</strong></td><td>Baseline Record Flag</td><td>ベースラインレコードの識別</td></tr>
<tr><td><strong>ANL01FL</strong></td><td>Analysis Flag 01</td><td>特定の解析用レコードの識別（例：LOCF）</td></tr>
<tr><td><strong>AENTMTFL</strong></td><td>End of Treatment Flag</td><td>投与終了時点のレコード</td></tr>
</tbody>
</table>

<h2>ADLB/ADVSから作成される主要TLF</h2>

<h3>1. 記述統計量テーブル</h3>
<p>各パラメータ × 時点ごとのAVAL, CHGの要約統計量（n, Mean, SD, Median, Min, Max）</p>

<h3>2. シフトテーブル</h3>
<p>ベースラインの正常/異常（BNRIND）から最終時点の正常/異常（ANRIND）への変化を集計</p>
<table>
<thead>
<tr><th></th><th>Post: Low</th><th>Post: Normal</th><th>Post: High</th></tr>
</thead>
<tbody>
<tr><td><strong>Base: Low</strong></td><td>n</td><td>n</td><td>n</td></tr>
<tr><td><strong>Base: Normal</strong></td><td>n</td><td>n</td><td>n</td></tr>
<tr><td><strong>Base: High</strong></td><td>n</td><td>n</td><td>n</td></tr>
</tbody>
</table>

<h3>3. 異常値テーブル（Potentially Clinically Significant）</h3>
<p>臨床的に重要な異常値（PCS基準）に該当する被験者を集計します。</p>
<ul>
<li>PCS基準は事前に定義（例：ALT > 3×ULN）</li>
<li>ベースラインで正常→投与後に異常に変化した被験者を特定</li>
</ul>

<h3>4. 経時推移図（Spaghetti Plot / Mean Plot）</h3>
<p>パラメータの経時変化をグラフ化</p>
<ul>
<li><strong>Mean Plot</strong>：各投与群の平均値±SE/SDの推移（エラーバー付き折れ線グラフ）</li>
<li><strong>Spaghetti Plot</strong>：個別被験者の推移（各被験者が1本の線）</li>
<li><strong>Box Plot</strong>：各時点での分布を箱ひげ図で表示</li>
</ul>

<div class="info-box warning">
<div class="info-box-title">⚠️ Hy's Law（ハイの法則）に関するTLF</div>
FDA は肝臓関連の安全性評価として<strong>Hy's Law</strong>の評価を求めます。ALT（またはAST）> 3×ULN かつ TBL > 2×ULN の被験者を特定するため、eDISHプロット（evaluation of Drug-Induced Serious Hepatotoxicity）というFigureを作成することがあります。
</div>
`,
            quiz: [
                { id: "q403_1", type: "choice", question: "BDS構造で1レコードが表すのは何ですか？", options: ["1被験者", "1有害事象", "1パラメータ × 1時点", "1投与群"], answer: 2, explanation: "BDS（Basic Data Structure）は1パラメータ × 1時点ごとに1レコードを持つ構造です。" },
                { id: "q403_2", type: "choice", question: "ベースラインからの変化量を格納する変数はどれですか？", options: ["AVAL", "BASE", "CHG", "ANRIND"], answer: 2, explanation: "CHG（Change from Baseline）はAVAL - BASEで算出されるベースラインからの変化量です。" },
                { id: "q403_3", type: "choice", question: "シフトテーブルで使用される変数の組み合わせはどれですか？", options: ["AVAL と BASE", "CHG と PCHG", "BNRIND と ANRIND", "ANRLO と ANRHI"], answer: 2, explanation: "シフトテーブルではBNRIND（ベースライン時の正常/異常）とANRIND（評価時点の正常/異常）を使用します。" },
                { id: "q403_4", type: "choice", question: "ベースラインレコードを識別するフラグ変数はどれですか？", options: ["ABLFL", "ANL01FL", "AENTMTFL", "TRTEMFL"], answer: 0, explanation: "ABLFL（Baseline Record Flag）はベースラインレコードを'Y'で識別するフラグ変数です。" },
                { id: "q403_5", type: "fill", question: "変化率（Percent Change from Baseline）を格納する変数名は？（英語4文字で回答）", answer: "PCHG", explanation: "PCHG（Percent Change from Baseline）は(AVAL - BASE) / BASE × 100 で算出される変化率です。" }
            ]
        },
        {
            id: 404,
            title: "ADTTE（Time-to-Event）",
            duration: "25分",
            content: `
<h2>ADTTEの概要</h2>
<p><strong>ADTTE（Analysis Dataset for Time-to-Event）</strong>は生存時間解析用のデータセットです。Kaplan-Meier曲線やCox比例ハザードモデルなど、臨床試験の重要なエンドポイント解析に使用されます。特にオンコロジー（腫瘍学）領域では中核的なデータセットです。</p>

<h2>ADTTEの構造</h2>
<p>ADTTEは<strong>BDS構造</strong>に属し、<strong>1被験者 × 1パラメータ</strong>ごとに1レコードを持ちます（時点の概念はなく、イベント発生までの時間を1行で表現）。</p>

<table>
<thead>
<tr><th>変数名</th><th>説明</th><th>例</th></tr>
</thead>
<tbody>
<tr><td><strong>PARAMCD</strong></td><td>パラメータコード</td><td>OS（全生存期間）, PFS（無増悪生存期間）</td></tr>
<tr><td><strong>PARAM</strong></td><td>パラメータ名</td><td>Overall Survival (Months)</td></tr>
<tr><td><strong>AVAL</strong></td><td>解析値（イベントまでの時間）</td><td>365（日数）</td></tr>
<tr><td><strong>CNSR</strong></td><td>打ち切りフラグ</td><td>0 = イベント発生、1 = 打ち切り</td></tr>
<tr><td><strong>EVNTDESC</strong></td><td>イベントの説明</td><td>Death, Disease Progression</td></tr>
<tr><td><strong>CNSDTDSC</strong></td><td>打ち切りの説明</td><td>Ongoing, Lost to Follow-up</td></tr>
<tr><td><strong>STARTDT</strong></td><td>Time-to-Eventの起点日</td><td>ランダム化日</td></tr>
<tr><td><strong>ADT</strong></td><td>イベント/打ち切り日</td><td>死亡日または最終生存確認日</td></tr>
</tbody>
</table>

<div class="info-box tip">
<div class="info-box-title">💡 CNSR（打ち切りフラグ）の理解</div>
生存時間解析では、試験終了時にまだイベントが発生していない被験者のデータを「打ち切り（Censored）」として扱います。CNSR=0はイベント発生（死亡、増悪等）、CNSR=1は打ち切り（生存中、追跡不能等）を示します。なお、SASのPROC LIFETESTではCNSR=1が打ち切りですが、一部のソフトウェアでは逆の定義もあるため注意が必要です。
</div>

<h2>ADTTEの主要パラメータ</h2>
<table>
<thead>
<tr><th>PARAMCD</th><th>パラメータ名</th><th>イベント定義</th></tr>
</thead>
<tbody>
<tr><td><strong>OS</strong></td><td>Overall Survival（全生存期間）</td><td>あらゆる原因による死亡</td></tr>
<tr><td><strong>PFS</strong></td><td>Progression-Free Survival（無増悪生存期間）</td><td>疾患増悪または死亡</td></tr>
<tr><td><strong>DFS</strong></td><td>Disease-Free Survival（無病生存期間）</td><td>再発または死亡</td></tr>
<tr><td><strong>EFS</strong></td><td>Event-Free Survival（無イベント生存期間）</td><td>定義されたイベント</td></tr>
<tr><td><strong>TTR</strong></td><td>Time to Response（奏効までの時間）</td><td>初回奏効</td></tr>
<tr><td><strong>DOR</strong></td><td>Duration of Response（奏効持続期間）</td><td>奏効後の増悪または死亡</td></tr>
</tbody>
</table>

<h2>ADTTEから作成される主要TLF</h2>

<h3>1. Kaplan-Meier曲線</h3>
<p>生存時間の推移を視覚的に表現するFigureです。</p>
<ul>
<li><strong>X軸</strong>：時間（月数または日数）</li>
<li><strong>Y軸</strong>：生存確率（0〜1）</li>
<li><strong>投与群別</strong>：異なる色/線種で表示</li>
<li><strong>付帯情報</strong>：Number at Risk表、中央値、95% CI</li>
<li><strong>SAS</strong>：PROC LIFETEST with ODS GRAPHICS</li>
</ul>

<h3>2. Cox比例ハザードモデルの結果Table</h3>
<table>
<thead>
<tr><th>表示項目</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td>ハザード比（HR）</td><td>治療群 vs 対照群のリスク比</td></tr>
<tr><td>95% 信頼区間</td><td>HRの信頼区間</td></tr>
<tr><td>p値</td><td>統計的有意性</td></tr>
<tr><td>イベント数</td><td>各群のイベント発生数</td></tr>
<tr><td>中央値</td><td>生存時間の中央値と95% CI</td></tr>
</tbody>
</table>

<h3>3. Forest Plot（サブグループ解析）</h3>
<p>各サブグループ（年齢、性別、地域等）のハザード比を視覚的に比較するFigureです。</p>
<ul>
<li>各サブグループのHRと95% CIを横棒で表示</li>
<li>HR=1の垂直参照線</li>
<li>全体のHRも表示</li>
</ul>

<div class="info-box warning">
<div class="info-box-title">⚠️ 生存時間解析の注意点</div>
AVALの単位（日数 vs 月数）は仕様書で定義されます。日数から月数への変換方法（例：AVAL/30.4375）もSAPで規定されるため、必ず確認してください。また、打ち切り日の設定ロジック（最終生存確認日、ランダム化日+1等）はパラメータごとに異なることがあります。
</div>
`,
            quiz: [
                { id: "q404_1", type: "choice", question: "ADTTEでイベントが発生した場合のCNSRの値はどれですか？", options: ["0", "1", "Y", "N"], answer: 0, explanation: "CNSR=0はイベント発生を示します。CNSR=1は打ち切り（Censored）を示します。" },
                { id: "q404_2", type: "choice", question: "PFSのイベント定義に含まれるのはどれですか？", options: ["死亡のみ", "疾患増悪のみ", "疾患増悪または死亡", "奏効"], answer: 2, explanation: "PFS（Progression-Free Survival）のイベントは疾患増悪または死亡のいずれか早い方です。" },
                { id: "q404_3", type: "choice", question: "サブグループごとのハザード比を視覚的に比較するFigureはどれですか？", options: ["Kaplan-Meier曲線", "Forest Plot", "ウォーターフォールプロット", "Spaghetti Plot"], answer: 1, explanation: "Forest Plotは各サブグループのハザード比と信頼区間を横棒グラフで表示するFigureです。" },
                { id: "q404_4", type: "choice", question: "Cox比例ハザードモデルで治療効果の指標として使用されるのはどれですか？", options: ["オッズ比", "リスク差", "ハザード比（HR）", "相対リスク"], answer: 2, explanation: "Cox比例ハザードモデルではハザード比（HR）が治療効果の主要指標として使用されます。" },
                { id: "q404_5", type: "fill", question: "全生存期間（Overall Survival）のADTTEでのPARAMCDは？（英語2文字で回答）", answer: "OS", explanation: "OS（Overall Survival）は全生存期間を示すPARAMCDで、あらゆる原因による死亡をイベントとします。" }
            ]
        }
    ]
};
