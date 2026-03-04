/* ============================================
   TLF Academy - Level 3: CDISC標準の概要
   ============================================ */

const LEVEL3_DATA = {
    id: 3,
    title: "CDISC標準の概要",
    icon: "📋",
    description: "TLF作成に不可欠なCDISC標準のデータフローを理解する",
    modules: [
        {
            id: 301,
            title: "CDISCの全体像",
            duration: "20分",
            content: `
<h2>CDISCとは</h2>
<p><strong>CDISC（Clinical Data Interchange Standards Consortium）</strong>は、臨床試験データの取得・交換・提出・保存のための国際標準を開発する非営利団体です。TLFプログラマーにとって、CDISCの標準体系を理解することは不可欠です。</p>

<h2>CDISC標準のデータフロー</h2>
<p>臨床試験のデータは以下の流れで標準化され、最終的にTLFとして出力されます：</p>

<ol>
<li><strong>CDASH（データ収集）</strong>→ CRFでの被験者データ収集</li>
<li><strong>SDTM（データ集計）</strong>→ 収集データの標準化・集計</li>
<li><strong>ADaM（解析データ）</strong>→ 統計解析用データセットの作成</li>
<li><strong>TLF（成果物）</strong>→ 最終的な表・一覧表・図の生成</li>
</ol>

<div class="info-box tip">
<div class="info-box-title">💡 データフローの理解が重要な理由</div>
TLFプログラマーは主にADaMデータセットからTLFを作成しますが、ADaMの元データであるSDTMの構造や、さらにその元であるCRFデータの流れを理解することで、データの品質問題やトレーサビリティの確保が容易になります。
</div>

<h2>主要なCDISC標準</h2>
<table>
<thead>
<tr><th>標準</th><th>正式名称</th><th>役割</th><th>TLFとの関係</th></tr>
</thead>
<tbody>
<tr><td><strong>CDASH</strong></td><td>Clinical Data Acquisition Standards Harmonization</td><td>CRFの標準化</td><td>データの源泉</td></tr>
<tr><td><strong>SDTM</strong></td><td>Study Data Tabulation Model</td><td>収集データの集計</td><td>Listing用データの参照元</td></tr>
<tr><td><strong>ADaM</strong></td><td>Analysis Data Model</td><td>解析データの標準化</td><td><strong>TLFの直接の入力データ</strong></td></tr>
<tr><td><strong>Define-XML</strong></td><td>Data Definition</td><td>メタデータ定義</td><td>データセットの仕様書</td></tr>
<tr><td><strong>Controlled Terminology</strong></td><td>CT</td><td>用語の標準化</td><td>TLF表示値の標準化</td></tr>
</tbody>
</table>

<h2>Controlled Terminology（CT）</h2>
<p>CTはCDISCで使用される用語やコードの標準辞書です。TLFでの表示値もCTに準拠する必要があります。</p>
<ul>
<li><strong>SEX</strong>：M（Male）, F（Female）</li>
<li><strong>RACE</strong>：WHITE, BLACK OR AFRICAN AMERICAN, ASIAN等</li>
<li><strong>ETHNIC</strong>：HISPANIC OR LATINO, NOT HISPANIC OR LATINO</li>
<li><strong>AESEV（重症度）</strong>：MILD, MODERATE, SEVERE</li>
</ul>

<h2>関連ガイドライン文書</h2>
<table>
<thead>
<tr><th>文書</th><th>内容</th></tr>
</thead>
<tbody>
<tr><td>SDTM IG</td><td>SDTMの実装ガイド（ドメイン・変数の詳細）</td></tr>
<tr><td>ADaM IG</td><td>ADaMの実装ガイド（データセット構造の詳細）</td></tr>
<tr><td>ADaMIG for BDS</td><td>BDS構造の詳細ガイド</td></tr>
<tr><td>ADRG</td><td>Analysis Data Reviewer's Guide</td></tr>
<tr><td>SDRG</td><td>Study Data Reviewer's Guide</td></tr>
</tbody>
</table>

<div class="info-box warning">
<div class="info-box-title">⚠️ バージョン管理</div>
CDISC標準は定期的に更新されます。プロジェクトで使用するSDTM IG、ADaM IG、CTのバージョンは試験開始時に決定し、途中で変更しないことが原則です。FDA Data Standards Catalogで推奨バージョンを確認してください。
</div>
`,
            quiz: [
                { id: "q301_1", type: "choice", question: "TLFの直接の入力データとなるCDISC標準はどれですか？", options: ["CDASH", "SDTM", "ADaM", "Define-XML"], answer: 2, explanation: "ADaM（Analysis Data Model）がTLFの直接の入力データとなります。" },
                { id: "q301_2", type: "choice", question: "CDISCのデータフローで、SDTMの次に位置するのはどれですか？", options: ["CDASH", "ADaM", "Define-XML", "TLF"], answer: 1, explanation: "CDISCのデータフローは CDASH → SDTM → ADaM → TLF の順です。" },
                { id: "q301_3", type: "choice", question: "CDISCで用語やコードの標準辞書を何と呼びますか？", options: ["Define-XML", "Controlled Terminology", "MedDRA", "WHO Drug"], answer: 1, explanation: "Controlled Terminology（CT）はCDISCで使用される用語やコードの標準辞書です。" },
                { id: "q301_4", type: "choice", question: "FDA推奨のCDISCバージョンを確認できる文書はどれですか？", options: ["ICH E3", "ADRG", "FDA Data Standards Catalog", "SDRG"], answer: 2, explanation: "FDA Data Standards CatalogでFDA推奨のCDISCバージョンを確認できます。" },
                { id: "q301_5", type: "fill", question: "CRFでのデータ収集を標準化するCDISC標準の略称は？（英語5文字で回答）", answer: "CDASH", explanation: "CDASH（Clinical Data Acquisition Standards Harmonization）はCRFでのデータ収集を標準化するCDISC標準です。" }
            ]
        },
        {
            id: 302,
            title: "SDTMの基本",
            duration: "20分",
            content: `
<h2>SDTM（Study Data Tabulation Model）</h2>
<p><strong>SDTM</strong>は臨床試験で収集されたデータを標準的な表形式に整理するモデルです。TLFプログラマーは主にADaMを使用しますが、SDTMの構造を理解することでデータの由来を追跡できます。</p>

<h2>SDTMのドメイン構造</h2>
<p>SDTMのデータは機能別に「ドメイン」と呼ばれるデータセットに分類されます。</p>

<h3>主要なドメインクラス</h3>
<table>
<thead>
<tr><th>クラス</th><th>説明</th><th>代表的なドメイン</th></tr>
</thead>
<tbody>
<tr><td><strong>Special Purpose</strong></td><td>試験の基本情報</td><td>DM（Demographics）, SE, SV</td></tr>
<tr><td><strong>Interventions</strong></td><td>投与・処置の記録</td><td>EX（Exposure）, CM, SU</td></tr>
<tr><td><strong>Events</strong></td><td>イベントの記録</td><td>AE（Adverse Events）, DS, MH</td></tr>
<tr><td><strong>Findings</strong></td><td>検査・評価の結果</td><td>LB（Lab）, VS（Vital Signs）, EG</td></tr>
<tr><td><strong>Trial Design</strong></td><td>試験設計情報</td><td>TA, TE, TV, TS</td></tr>
</tbody>
</table>

<h3>TLFで特に重要なSDTMドメイン</h3>
<table>
<thead>
<tr><th>ドメイン</th><th>名称</th><th>TLFでの用途</th></tr>
</thead>
<tbody>
<tr><td><strong>DM</strong></td><td>Demographics</td><td>人口統計Table、被験者Listing</td></tr>
<tr><td><strong>AE</strong></td><td>Adverse Events</td><td>有害事象Table/Listing</td></tr>
<tr><td><strong>LB</strong></td><td>Laboratory Tests</td><td>臨床検査値Table/Figure</td></tr>
<tr><td><strong>VS</strong></td><td>Vital Signs</td><td>バイタルサインTable</td></tr>
<tr><td><strong>EX</strong></td><td>Exposure</td><td>治験薬曝露Table</td></tr>
<tr><td><strong>DS</strong></td><td>Disposition</td><td>被験者の内訳Table</td></tr>
<tr><td><strong>RS</strong></td><td>Disease Response</td><td>腫瘍縮小効果Table</td></tr>
</tbody>
</table>

<h2>SDTMの主要変数</h2>
<p>SDTMの各ドメインには標準的な変数構造があります。</p>

<table>
<thead>
<tr><th>変数タイプ</th><th>例</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><strong>識別変数</strong></td><td>STUDYID, USUBJID, DOMAIN</td><td>レコードの識別</td></tr>
<tr><td><strong>トピック変数</strong></td><td>AETERM, LBTESTCD, VSTESTCD</td><td>観測の主題</td></tr>
<tr><td><strong>タイミング変数</strong></td><td>AESTDTC, VISITNUM, VISIT</td><td>時点の情報</td></tr>
<tr><td><strong>修飾変数</strong></td><td>AESEV, AESER, AEREL</td><td>観測の属性</td></tr>
</tbody>
</table>

<div class="info-box tip">
<div class="info-box-title">💡 USUBJIDの重要性</div>
<strong>USUBJID</strong>（Unique Subject Identifier）は全ドメインを通じて被験者を一意に識別する変数です。通常「STUDYID-SITEID-SUBJID」の形式で構成されます。ADaMでも同じUSUBJIDが使用され、SDTMとADaM間のトレーサビリティを確保します。
</div>

<h2>SDTMからTLFへの参照パターン</h2>
<p>通常、TLFはADaMから作成しますが、以下の場合にSDTMを直接参照することがあります：</p>
<ul>
<li><strong>データリスティング</strong>：個別被験者データの一覧表</li>
<li><strong>Medical History Listing</strong>：既往歴のListing</li>
<li><strong>Concomitant Medication Listing</strong>：併用薬のListing</li>
<li><strong>Protocol Deviation Listing</strong>：プロトコル逸脱のListing</li>
</ul>

<div class="info-box warning">
<div class="info-box-title">⚠️ SDTMとADaMの使い分け</div>
規制当局の方針として、統計解析の結果を示すTables/FiguresはADaMから作成し、個別データのListingsはSDTMまたはADaMから作成することが推奨されています。どちらのデータセットを使用するかは仕様書に明記されます。
</div>
`,
            quiz: [
                { id: "q302_1", type: "choice", question: "SDTMで有害事象データを格納するドメインはどれですか？", options: ["DM", "LB", "AE", "DS"], answer: 2, explanation: "AE（Adverse Events）ドメインは有害事象データを格納します。" },
                { id: "q302_2", type: "choice", question: "SDTMのドメインクラスのうち、検査や評価の結果を格納するのはどれですか？", options: ["Events", "Interventions", "Special Purpose", "Findings"], answer: 3, explanation: "Findingsクラスは検査値（LB）やバイタルサイン（VS）などの検査・評価結果を格納します。" },
                { id: "q302_3", type: "choice", question: "全ドメインを通じて被験者を一意に識別する変数はどれですか？", options: ["SUBJID", "USUBJID", "STUDYID", "SITEID"], answer: 1, explanation: "USUBJID（Unique Subject Identifier）は全ドメインを通じて被験者を一意に識別する変数です。" },
                { id: "q302_4", type: "choice", question: "被験者の内訳（Disposition）を格納するSDTMドメインはどれですか？", options: ["DM", "DS", "SV", "SE"], answer: 1, explanation: "DS（Disposition）ドメインは被験者の試験参加状況（完了、中止等）を格納します。" },
                { id: "q302_5", type: "fill", question: "SDTMのドメインのうち、Demographics（人口統計）の略称は？（英語2文字で回答）", answer: "DM", explanation: "DM（Demographics）は被験者の人口統計情報（年齢、性別、人種等）を格納するドメインです。" }
            ]
        },
        {
            id: 303,
            title: "ADaMの基本",
            duration: "25分",
            content: `
<h2>ADaM（Analysis Data Model）</h2>
<p><strong>ADaM</strong>はTLFの直接の入力データとなる解析用データセットの標準です。TLFプログラマーが日常的に最も多く扱うデータ構造であり、その理解はTLF作成の基盤となります。</p>

<h2>ADaMの主要データセット構造</h2>
<table>
<thead>
<tr><th>構造</th><th>説明</th><th>代表的なデータセット</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td><strong>ADSL</strong></td><td>Subject Level（被験者レベル）</td><td>ADSL</td><td>人口統計、対象集団フラグ</td></tr>
<tr><td><strong>BDS</strong></td><td>Basic Data Structure</td><td>ADLB, ADVS, ADEFF</td><td>検査値、バイタルサイン、有効性</td></tr>
<tr><td><strong>OCCDS</strong></td><td>Occurrence Data Structure</td><td>ADAE, ADCM</td><td>有害事象、併用薬</td></tr>
<tr><td><strong>ADTTE</strong></td><td>Time-to-Event</td><td>ADTTE</td><td>生存時間解析</td></tr>
</tbody>
</table>

<h3>ADSL（Subject-Level Analysis Dataset）</h3>
<p>ADSLは<strong>1被験者1レコード</strong>の構造で、以下の情報を含みます：</p>
<ul>
<li><strong>人口統計変数</strong>：AGE, SEX, RACE, ETHNIC</li>
<li><strong>投与群変数</strong>：TRT01P（計画投与群）, TRT01A（実際の投与群）</li>
<li><strong>対象集団フラグ</strong>：SAFFL, FASFL, PPSFL</li>
<li><strong>試験参加情報</strong>：RFSTDTC, RFENDTC, EOSSTT</li>
</ul>

<div class="info-box tip">
<div class="info-box-title">💡 ADSLはTLFの基盤</div>
ほぼ全てのTLFでADSLが使用されます。人口統計テーブル、被験者の内訳、そして他のADaMデータセットとのマージにも必須です。ADSLの投与群変数（TRT01P/TRT01A）はTLFの列構成を決定する重要な変数です。
</div>

<h3>BDS（Basic Data Structure）</h3>
<p>BDSは検査値やバイタルサインなど、<strong>パラメータ×時点</strong>ごとにレコードを持つ構造です。</p>

<table>
<thead>
<tr><th>変数</th><th>説明</th><th>TLFでの使用</th></tr>
</thead>
<tbody>
<tr><td><strong>PARAM / PARAMCD</strong></td><td>パラメータ名/コード</td><td>行の識別（どの検査項目か）</td></tr>
<tr><td><strong>AVAL</strong></td><td>解析値（Analysis Value）</td><td>実測値の表示・集計</td></tr>
<tr><td><strong>BASE</strong></td><td>ベースライン値</td><td>ベースライン列の値</td></tr>
<tr><td><strong>CHG</strong></td><td>変化量（AVAL - BASE）</td><td>変化量の集計</td></tr>
<tr><td><strong>PCHG</strong></td><td>変化率（%）</td><td>変化率の集計</td></tr>
<tr><td><strong>AVISIT / AVISITN</strong></td><td>解析VISIT名/番号</td><td>時点別の集計</td></tr>
<tr><td><strong>ANRIND</strong></td><td>解析基準範囲区分</td><td>正常/異常の分類</td></tr>
<tr><td><strong>ABLFL</strong></td><td>ベースラインフラグ</td><td>ベースラインレコードの識別</td></tr>
</tbody>
</table>

<h3>OCCDS（Occurrence Data Structure）</h3>
<p>OCCDSは有害事象や併用薬など、<strong>イベントの発生</strong>ごとにレコードを持つ構造です。ADAEが最も代表的です。</p>

<table>
<thead>
<tr><th>変数（ADAE）</th><th>説明</th><th>TLFでの使用</th></tr>
</thead>
<tbody>
<tr><td><strong>AEBODSYS</strong></td><td>器官別大分類（SOC）</td><td>SOC別の集計</td></tr>
<tr><td><strong>AEDECOD</strong></td><td>基本語（PT）</td><td>PT別の集計</td></tr>
<tr><td><strong>AESEV</strong></td><td>重症度</td><td>重症度別の集計</td></tr>
<tr><td><strong>AESER</strong></td><td>重篤性フラグ</td><td>SAEのサブセット</td></tr>
<tr><td><strong>TRTEMFL</strong></td><td>治療下発現フラグ</td><td>TEAEのサブセット</td></tr>
</tbody>
</table>

<div class="info-box warning">
<div class="info-box-title">⚠️ TEAE（Treatment-Emergent AE）</div>
安全性TLFの多くはTEAE（治療下発現有害事象）を対象とします。TREMFLフラグはTEAEの判定に使用され、治験薬の投与開始後に新たに発現した、または悪化した有害事象を識別します。TLF作成時には必ずTREMFLでフィルタリングします。
</div>
`,
            quiz: [
                { id: "q303_1", type: "choice", question: "ADaMで1被験者1レコードの構造を持つデータセットはどれですか？", options: ["ADAE", "ADLB", "ADSL", "ADTTE"], answer: 2, explanation: "ADSL（Subject-Level Analysis Dataset）は1被験者1レコードの構造を持ちます。" },
                { id: "q303_2", type: "choice", question: "BDS構造でベースラインからの変化量を格納する変数はどれですか？", options: ["AVAL", "BASE", "CHG", "PCHG"], answer: 2, explanation: "CHG（Change from Baseline）はAVAL - BASEで算出されるベースラインからの変化量です。" },
                { id: "q303_3", type: "choice", question: "ADaEの器官別大分類（SOC）を格納する変数はどれですか？", options: ["AEDECOD", "AEBODSYS", "AESEV", "AETERM"], answer: 1, explanation: "AEBODSYS（Body System or Organ Class）は器官別大分類（SOC）を格納します。" },
                { id: "q303_4", type: "choice", question: "ADSLで計画投与群を示す変数はどれですか？", options: ["TRT01A", "TRT01P", "TRTA", "TRTP"], answer: 1, explanation: "TRT01P（Planned Treatment for Period 01）はADSLで計画投与群を示す変数です。" },
                { id: "q303_5", type: "fill", question: "ADaMのBDS構造で解析値を格納する変数名は？（英語4文字で回答）", answer: "AVAL", explanation: "AVAL（Analysis Value）はBDS構造で解析値を格納する変数です。" }
            ]
        },
        {
            id: 304,
            title: "ADaMからTLFへの展開",
            duration: "20分",
            content: `
<h2>ADaMデータセットとTLFのマッピング</h2>
<p>TLFプログラマーの主要業務は、ADaMデータセットを入力として適切なTLFを生成することです。ここでは、ADaMの各データセットが具体的にどのTLFに展開されるかを学びます。</p>

<h2>ADaM→TLFマッピング概要</h2>
<table>
<thead>
<tr><th>ADaMデータセット</th><th>主要なTLF</th><th>種類</th></tr>
</thead>
<tbody>
<tr><td><strong>ADSL</strong></td><td>被験者の内訳、人口統計、医療歴</td><td>Tables</td></tr>
<tr><td><strong>ADAE</strong></td><td>有害事象要約、SAE一覧</td><td>Tables, Listings</td></tr>
<tr><td><strong>ADLB</strong></td><td>臨床検査値の変化、シフトテーブル</td><td>Tables, Figures</td></tr>
<tr><td><strong>ADVS</strong></td><td>バイタルサインの推移</td><td>Tables, Figures</td></tr>
<tr><td><strong>ADEFF</strong></td><td>有効性エンドポイントの解析</td><td>Tables, Figures</td></tr>
<tr><td><strong>ADTTE</strong></td><td>Kaplan-Meier曲線、Cox回帰</td><td>Tables, Figures</td></tr>
<tr><td><strong>ADPC</strong></td><td>血中濃度推移、PKパラメータ</td><td>Tables, Figures</td></tr>
</tbody>
</table>

<h2>典型的なTLF作成パターン</h2>

<h3>パターン1：ADSL → 人口統計Table</h3>
<p>ADSLから直接集計して人口統計の要約テーブルを作成します。</p>
<ul>
<li><strong>入力</strong>：ADSL（WHERE SAFFL='Y'）</li>
<li><strong>集計内容</strong>：AGE（連続変数→n, Mean, SD, Median, Min, Max）、SEX, RACE（カテゴリカル→n, %）</li>
<li><strong>列構成</strong>：TRT01P別 + Total列</li>
</ul>

<h3>パターン2：ADAE → 有害事象要約Table</h3>
<p>ADAEからTEAEの発現頻度を集計します。</p>
<ul>
<li><strong>入力</strong>：ADAE（WHERE SAFFL='Y' AND TRTEMFL='Y'）</li>
<li><strong>集計内容</strong>：AEBODSYS × AEDECOD別の被験者数と割合</li>
<li><strong>列構成</strong>：TRTxxA別</li>
<li><strong>並び順</strong>：SOC（アルファベット順）→ PT（降順：発現頻度順が多い）</li>
</ul>

<div class="info-box tip">
<div class="info-box-title">💡 Big Nの考え方</div>
有害事象テーブルでは、各投与群の被験者総数（Big N）を列ヘッダーに表示します。Big NはADSLのSAFFL='Y'の被験者数から取得します。各PTの発現率はこのBig Nを分母として計算します：n/N × 100 = %
</div>

<h3>パターン3：ADLB → 検査値シフトTable</h3>
<p>検査値のベースラインから最終評価時点への変化（正常/異常）を集計します。</p>
<ul>
<li><strong>入力</strong>：ADLB（ベースライン：ABLFL='Y'、最終時点：ANL01FL='Y'等）</li>
<li><strong>集計内容</strong>：BASEのANRIND × PostのANRINDのクロス集計</li>
<li><strong>表示形式</strong>：行=ベースライン区分（Low/Normal/High）、列=最終区分</li>
</ul>

<h3>パターン4：ADTTE → Kaplan-Meier Figure</h3>
<p>生存時間データからKaplan-Meier曲線を作成します。</p>
<ul>
<li><strong>入力</strong>：ADTTE（特定のPARAMCD）</li>
<li><strong>キー変数</strong>：AVAL（日数）, CNSR（打ち切りフラグ）</li>
<li><strong>SASプロシジャ</strong>：PROC LIFETEST（PLOTS=SURVIVAL）</li>
<li><strong>表示要素</strong>：曲線、信頼区間、Number at Risk表、p値</li>
</ul>

<h2>TLFプログラミングの一般的な流れ</h2>
<ol>
<li><strong>データ読み込み</strong>：必要なADaMデータセットを読み込む</li>
<li><strong>サブセット</strong>：対象集団フラグ、その他の条件でフィルタリング</li>
<li><strong>データ加工</strong>：マージ、導出、フォーマット適用</li>
<li><strong>集計処理</strong>：PROC FREQ, PROC MEANS, PROC LIFETEST等</li>
<li><strong>結果の整形</strong>：レポート用データセットの作成</li>
<li><strong>出力生成</strong>：PROC REPORT, ODS RTF/PDF等で出力</li>
</ol>

<div class="info-box warning">
<div class="info-box-title">⚠️ ADaMの品質がTLFの品質を決める</div>
TLFの正確性はADaMデータセットの品質に依存します。TLFプログラマーはADaMの導出ロジックを理解し、異常値やデータの整合性問題を発見した場合は、ADaMプログラマーや統計担当者にフィードバックする必要があります。
</div>
`,
            quiz: [
                { id: "q304_1", type: "choice", question: "有害事象要約Tableの分母（Big N）はどのデータセットから取得しますか？", options: ["ADAE", "ADSL", "ADLB", "ADTTE"], answer: 1, explanation: "Big N（投与群ごとの被験者総数）はADSLのSAFFL='Y'の被験者数から取得します。" },
                { id: "q304_2", type: "choice", question: "Kaplan-Meier曲線の作成に使用するADaMデータセットはどれですか？", options: ["ADAE", "ADEFF", "ADLB", "ADTTE"], answer: 3, explanation: "ADTTE（Time-to-Event）データセットがKaplan-Meier曲線の作成に使用されます。" },
                { id: "q304_3", type: "choice", question: "SASでKaplan-Meier曲線を出力するプロシジャはどれですか？", options: ["PROC FREQ", "PROC MEANS", "PROC LIFETEST", "PROC LOGISTIC"], answer: 2, explanation: "PROC LIFETESTはKaplan-Meier曲線を含む生存時間解析を行うSASプロシジャです。" },
                { id: "q304_4", type: "choice", question: "検査値のシフトテーブルで使用される変数はどれですか？", options: ["AVAL", "CHG", "ANRIND", "PCHG"], answer: 2, explanation: "ANRIND（Analysis Normal Range Indicator）はシフトテーブルでベースラインと評価時点の正常/異常区分を比較するために使用されます。" },
                { id: "q304_5", type: "fill", question: "ADTTEで打ち切り（Censoring）を示す変数名は？（英語4文字で回答）", answer: "CNSR", explanation: "CNSR（Censor）は打ち切りフラグで、イベント発生=0、打ち切り=1を示します。" }
            ]
        }
    ]
};
