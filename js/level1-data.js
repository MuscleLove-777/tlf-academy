/* ============================================
   TLF Academy - Level 1: TLFの基礎
   ============================================ */

const LEVEL1_DATA = {
    id: 1,
    title: "TLFの基礎",
    icon: "📊",
    description: "臨床試験におけるTLFの役割と基本概念を学ぶ",
    modules: [
        {
            id: 101,
            title: "TLFとは",
            duration: "15分",
            content: `
<h2>TLF（Tables, Listings, Figures）とは</h2>
<p><strong>TLF</strong>とは、臨床試験の結果を要約・表示するための<strong>表（Tables）</strong>、<strong>一覧表（Listings）</strong>、<strong>図（Figures）</strong>の総称です。臨床試験のデータを分析し、規制当局への提出文書やCSR（Clinical Study Report：治験総括報告書）に含める成果物として極めて重要な位置づけにあります。</p>

<h3>Tables（表）</h3>
<p>収集データの<strong>要約統計量</strong>を表形式で提示します。例えば、患者背景の要約、有害事象の発現頻度、有効性エンドポイントの解析結果などが含まれます。</p>

<h3>Listings（一覧表）</h3>
<p><strong>被験者ごと</strong>の個別データを一覧形式で表示します。データの詳細確認やメディカルライティング時のレビューに使用され、集約前の元データに近い形式で出力されます。</p>

<h3>Figures（図）</h3>
<p>データの傾向やパターンを<strong>視覚的</strong>に表現します。Kaplan-Meier曲線、Forest Plot、ウォーターフォールプロット、経時推移グラフなどが代表的です。</p>

<div class="info-box tip">
<div class="info-box-title">💡 TLFの重要性</div>
TLFは臨床試験のデータを「意味のある情報」に変換する最終成果物です。統計解析計画書（SAP）に基づいて作成され、規制当局の審査員が治験結果を評価する際の主要な資料となります。
</div>

<h2>CSR（治験総括報告書）におけるTLFの位置づけ</h2>
<p>CSRはICH E3ガイドラインに基づいて作成される治験の最終報告書です。TLFはCSRの以下の部分に組み込まれます：</p>

<table>
<thead>
<tr><th>CSRセクション</th><th>TLFの種類</th><th>内容例</th></tr>
</thead>
<tbody>
<tr><td>第11章：有効性</td><td>Tables, Figures</td><td>主要・副次エンドポイントの解析結果</td></tr>
<tr><td>第12章：安全性</td><td>Tables, Listings</td><td>有害事象、臨床検査値の要約・一覧</td></tr>
<tr><td>第14章：参考表</td><td>Tables</td><td>人口統計、被験者の内訳</td></tr>
<tr><td>第16章：付録</td><td>Listings</td><td>個別被験者データ一覧</td></tr>
</tbody>
</table>

<div class="info-box warning">
<div class="info-box-title">⚠️ 注意</div>
TLFの品質は直接的に規制当局の審査に影響します。データの不整合やフォーマットの不備は、審査の遅延やクエリの原因となります。
</div>

<h2>TLFの数量規模</h2>
<p>1つの臨床試験で作成されるTLFの数は試験の規模やフェーズによって異なりますが、一般的な目安は以下の通りです：</p>
<ul>
<li><strong>Phase I試験</strong>：50〜100本程度</li>
<li><strong>Phase II試験</strong>：100〜300本程度</li>
<li><strong>Phase III試験</strong>：300〜800本以上</li>
</ul>
`,
            quiz: [
                { id: "q101_1", type: "choice", question: "TLFの「T」は何を表しますか？", options: ["Tests", "Tables", "Trials", "Templates"], answer: 1, explanation: "TLFのTはTables（表）を表します。Tables, Listings, Figuresの略です。" },
                { id: "q101_2", type: "choice", question: "被験者ごとの個別データを一覧形式で表示するのはどれですか？", options: ["Tables", "Figures", "Listings", "Summary"], answer: 2, explanation: "Listings（一覧表）は被験者ごとの個別データを一覧形式で表示します。" },
                { id: "q101_3", type: "choice", question: "CSRの正式名称はどれですか？", options: ["Clinical Study Review", "Clinical Study Report", "Clinical Summary Report", "Clinical Statistical Report"], answer: 1, explanation: "CSRはClinical Study Report（治験総括報告書）の略です。" },
                { id: "q101_4", type: "choice", question: "Phase III試験で作成されるTLFの一般的な数はどのくらいですか？", options: ["10〜50本", "50〜100本", "100〜300本", "300〜800本以上"], answer: 3, explanation: "Phase III試験では一般的に300〜800本以上のTLFが作成されます。" },
                { id: "q101_5", type: "fill", question: "Kaplan-Meier曲線やForest PlotはTLFのうち、どの種類に分類されますか？（英語で回答）", answer: "Figures", explanation: "Kaplan-Meier曲線やForest PlotなどのグラフはFigures（図）に分類されます。" }
            ]
        },
        {
            id: 102,
            title: "TLFの種類と分類",
            duration: "20分",
            content: `
<h2>TLFの主要カテゴリ</h2>
<p>臨床試験のTLFは、大きく<strong>安全性</strong>、<strong>有効性</strong>、<strong>薬物動態（PK）</strong>、<strong>人口統計・被験者の内訳</strong>の4カテゴリに分類されます。</p>

<h3>1. 安全性TLF</h3>
<p>安全性TLFは臨床試験で最も数が多く、被験者の安全性に関するあらゆるデータを要約します。</p>
<table>
<thead>
<tr><th>TLF名</th><th>種類</th><th>内容</th></tr>
</thead>
<tbody>
<tr><td>有害事象の要約</td><td>Table</td><td>SOC/PT別の発現率、重症度別集計</td></tr>
<tr><td>重篤な有害事象一覧</td><td>Listing</td><td>SAEの個別詳細データ</td></tr>
<tr><td>臨床検査値の推移</td><td>Figure</td><td>検査項目別の経時変化グラフ</td></tr>
<tr><td>バイタルサイン変化量</td><td>Table</td><td>血圧・脈拍等のベースラインからの変化</td></tr>
<tr><td>心電図所見</td><td>Table/Listing</td><td>QTcF延長の要約と個別データ</td></tr>
</tbody>
</table>

<h3>2. 有効性TLF</h3>
<p>主要エンドポイント・副次エンドポイントの解析結果を表示します。</p>
<table>
<thead>
<tr><th>TLF名</th><th>種類</th><th>内容</th></tr>
</thead>
<tbody>
<tr><td>主要エンドポイント解析</td><td>Table</td><td>主要解析の統計結果（p値、CI等）</td></tr>
<tr><td>奏効率の要約</td><td>Table</td><td>CR/PR/SD/PDの分布</td></tr>
<tr><td>Kaplan-Meier曲線</td><td>Figure</td><td>生存時間・無増悪生存期間のグラフ</td></tr>
<tr><td>Forest Plot</td><td>Figure</td><td>サブグループ解析の結果</td></tr>
</tbody>
</table>

<h3>3. 薬物動態（PK）TLF</h3>
<p>薬物の体内動態に関するデータを表示します。主にPhase I試験で重要です。</p>
<ul>
<li><strong>PK パラメータの要約</strong>（Table）：Cmax, AUC, Tmax, T1/2等</li>
<li><strong>血中濃度推移グラフ</strong>（Figure）：時間-濃度曲線</li>
<li><strong>個別PK データ一覧</strong>（Listing）：被験者別のPKパラメータ値</li>
</ul>

<h3>4. 人口統計・被験者の内訳</h3>
<p>試験参加者の特性と試験の進行状況を示します。</p>
<ul>
<li><strong>被験者の内訳（Disposition）</strong>（Table）：スクリーニング→ランダム化→完了/中止</li>
<li><strong>人口統計学的特性</strong>（Table）：年齢、性別、人種、BMI等の要約</li>
<li><strong>治験薬曝露状況</strong>（Table）：投与期間、投与量の要約</li>
</ul>

<div class="info-box tip">
<div class="info-box-title">💡 TLFの番号体系</div>
多くの製薬企業では、TLFに体系的な番号を付与します。例：Table 14.1.1（14章、セクション1、出力1）のように、CSRのセクション番号に対応した体系が一般的です。
</div>

<h2>TLFの出力フォーマット</h2>
<table>
<thead>
<tr><th>フォーマット</th><th>用途</th><th>特徴</th></tr>
</thead>
<tbody>
<tr><td>RTF</td><td>CSR組み込み</td><td>Word互換、書式設定が容易</td></tr>
<tr><td>PDF</td><td>規制当局提出</td><td>レイアウト固定、改ざん防止</td></tr>
<tr><td>HTML</td><td>社内レビュー</td><td>インタラクティブ、検索容易</td></tr>
<tr><td>ODS</td><td>SAS出力</td><td>SASのOutput Delivery System</td></tr>
</tbody>
</table>
`,
            quiz: [
                { id: "q102_1", type: "choice", question: "臨床試験で最も数が多いTLFのカテゴリはどれですか？", options: ["有効性TLF", "安全性TLF", "PK TLF", "人口統計TLF"], answer: 1, explanation: "安全性TLFは臨床試験で最も数が多いカテゴリです。" },
                { id: "q102_2", type: "choice", question: "Kaplan-Meier曲線はどのカテゴリのTLFですか？", options: ["安全性TLF", "PK TLF", "有効性TLF", "人口統計TLF"], answer: 2, explanation: "Kaplan-Meier曲線は生存時間解析に用いられ、有効性TLFに分類されます。" },
                { id: "q102_3", type: "choice", question: "Cmax, AUC, Tmaxなどのパラメータを扱うTLFはどれですか？", options: ["安全性TLF", "有効性TLF", "薬物動態（PK）TLF", "人口統計TLF"], answer: 2, explanation: "Cmax, AUC, Tmaxは薬物動態パラメータであり、PK TLFで報告されます。" },
                { id: "q102_4", type: "choice", question: "CSRに組み込む際に一般的に使用される出力フォーマットはどれですか？", options: ["HTML", "ODS", "RTF", "CSV"], answer: 2, explanation: "RTFはWord互換でCSRへの組み込みに一般的に使用されます。" },
                { id: "q102_5", type: "fill", question: "有害事象をSOC（器官別大分類）とPT（基本語）で分類する際に使用する辞書の名称は？（アルファベットで回答）", answer: "MedDRA", explanation: "MedDRA（Medical Dictionary for Regulatory Activities）は有害事象のコーディングに使用される国際的な医学用語辞書です。" }
            ]
        },
        {
            id: 103,
            title: "TLFプログラマーの役割",
            duration: "15分",
            content: `
<h2>TLFプログラマーとは</h2>
<p><strong>TLFプログラマー</strong>（Statistical Programmer, SAS Programmerとも呼ばれる）は、統計解析計画書（SAP）と仕様書に基づいてTLFを作成する専門職です。臨床試験のデータを最終成果物に変換する重要な役割を担っています。</p>

<h2>チーム構成と役割分担</h2>
<table>
<thead>
<tr><th>役割</th><th>主な担当</th><th>TLFとの関係</th></tr>
</thead>
<tbody>
<tr><td><strong>統計解析担当者（Biostatistician）</strong></td><td>SAP作成、解析手法の決定</td><td>TLFの内容・解析手法を定義</td></tr>
<tr><td><strong>TLFプログラマー（Production）</strong></td><td>TLFプログラムの作成</td><td>SASプログラムで出力を生成</td></tr>
<tr><td><strong>QCプログラマー（Validation）</strong></td><td>独立検証プログラムの作成</td><td>Production出力の正確性を検証</td></tr>
<tr><td><strong>プログラミングリード</strong></td><td>タスク割当、レビュー、タイムライン管理</td><td>TLF全体の品質管理</td></tr>
<tr><td><strong>メディカルライター</strong></td><td>CSR執筆</td><td>TLFを参照してCSRの文章を作成</td></tr>
<tr><td><strong>データマネージャー</strong></td><td>データクリーニング、DB Lock</td><td>TLFの入力データの品質を保証</td></tr>
</tbody>
</table>

<h3>Double Programming（ダブルプログラミング）</h3>
<p>TLFの品質保証のため、<strong>Production（本番）</strong>と<strong>QC（検証）</strong>の2名が<strong>独立して</strong>プログラムを作成し、結果を比較します。</p>
<ol>
<li>Productionプログラマーが仕様書に基づきTLFを作成</li>
<li>QCプログラマーが独立した方法（異なるコード）で同じ結果を再現</li>
<li>両者の出力を比較（PROC COMPARE等）</li>
<li>差異がある場合は原因を調査し解決</li>
</ol>

<div class="info-box tip">
<div class="info-box-title">💡 なぜDouble Programmingが必要か</div>
規制当局は提出データの正確性を重視します。独立した2名による検証は、プログラミングエラーやデータ解釈の誤りを発見する最も効果的な手段です。一人のプログラマーが作成とQCの両方を行うことは避けるべきです。
</div>

<h2>TLFプログラマーに求められるスキル</h2>
<ul>
<li><strong>SAS</strong>：Base SAS, SAS/STAT, ODS, マクロプログラミング</li>
<li><strong>R</strong>：近年はRでのTLF作成も増加（特にFigure）</li>
<li><strong>CDISC標準</strong>：SDTM, ADaMの理解</li>
<li><strong>統計知識</strong>：記述統計、検定、生存時間解析の基礎</li>
<li><strong>臨床試験の知識</strong>：プロトコル、SAP、規制要件</li>
<li><strong>コミュニケーション</strong>：統計担当者、メディカルライターとの連携</li>
</ul>

<h2>キャリアパス</h2>
<table>
<thead>
<tr><th>レベル</th><th>役職例</th><th>主な業務</th></tr>
</thead>
<tbody>
<tr><td>ジュニア</td><td>Statistical Programmer I</td><td>Listings作成、QCプログラミング</td></tr>
<tr><td>ミッドレベル</td><td>Statistical Programmer II</td><td>Tables/Figures作成、マクロ開発</td></tr>
<tr><td>シニア</td><td>Senior Statistical Programmer</td><td>リード業務、仕様書作成、標準化</td></tr>
<tr><td>リード</td><td>Principal/Lead Programmer</td><td>プロジェクト管理、チーム指導</td></tr>
<tr><td>マネジメント</td><td>Programming Manager/Director</td><td>部門管理、戦略立案</td></tr>
</tbody>
</table>

<div class="info-box warning">
<div class="info-box-title">⚠️ 業界トレンド</div>
近年、SASに加えてR、Pythonの活用が増えています。FDAもオープンソースツールでの提出を認める方向に進んでおり、マルチ言語対応のスキルが求められています。
</div>
`,
            quiz: [
                { id: "q103_1", type: "choice", question: "TLFの品質保証のために2名が独立してプログラムを作成する手法を何と呼びますか？", options: ["Pair Programming", "Double Programming", "Code Review", "Cross Validation"], answer: 1, explanation: "Double Programming（ダブルプログラミング）は、ProductionとQCの2名が独立してプログラムを作成し結果を比較する手法です。" },
                { id: "q103_2", type: "choice", question: "SAPを作成し解析手法を決定する役割はどれですか？", options: ["TLFプログラマー", "データマネージャー", "統計解析担当者（Biostatistician）", "メディカルライター"], answer: 2, explanation: "統計解析担当者（Biostatistician）がSAPを作成し、解析手法を決定します。" },
                { id: "q103_3", type: "choice", question: "ジュニアプログラマーが最初に担当することが多いTLFの種類はどれですか？", options: ["Kaplan-Meier曲線", "Forest Plot", "Listings", "主要エンドポイント解析Table"], answer: 2, explanation: "Listingsは比較的単純な構造のため、ジュニアプログラマーが最初に担当することが多いです。" },
                { id: "q103_4", type: "choice", question: "SASでProductionとQCの出力を比較する際に使用するプロシジャはどれですか？", options: ["PROC PRINT", "PROC COMPARE", "PROC FREQ", "PROC MEANS"], answer: 1, explanation: "PROC COMPAREは2つのデータセットを比較し、差異を検出するために使用されます。" },
                { id: "q103_5", type: "fill", question: "CSRの文章を執筆し、TLFを参照して報告書を作成する役割を何と呼びますか？（カタカナで回答）", answer: "メディカルライター", explanation: "メディカルライターはCSRの執筆を担当し、TLFの結果を参照して報告書の文章を作成します。" }
            ]
        },
        {
            id: 104,
            title: "TLF作成の全体フロー",
            duration: "20分",
            content: `
<h2>TLF作成の全体プロセス</h2>
<p>TLFの作成は、臨床試験の計画段階から最終報告書の完成まで、複数のステップで構成される体系的なプロセスです。</p>

<h3>全体フロー概要</h3>
<ol>
<li><strong>プロトコル（治験実施計画書）</strong>の確定</li>
<li><strong>SAP（統計解析計画書）</strong>の作成</li>
<li><strong>Shell/Mock TLF</strong>の作成</li>
<li><strong>TLFプログラミング仕様書</strong>の作成</li>
<li><strong>プログラミング</strong>（Production + QC）</li>
<li><strong>Dry Run</strong>（データベースロック前のテスト実行）</li>
<li><strong>データベースロック（DB Lock）</strong></li>
<li><strong>最終TLF生成と品質確認</strong></li>
<li><strong>CSRへの組み込みと提出</strong></li>
</ol>

<h2>各ステップの詳細</h2>

<h3>Step 1: プロトコル</h3>
<p>プロトコルはTLFの「ゴール」を決定する出発点です。以下の情報がTLFに直接影響します：</p>
<ul>
<li>主要エンドポイント・副次エンドポイントの定義</li>
<li>解析対象集団の定義</li>
<li>試験デザイン（投与群、評価時点）</li>
</ul>

<h3>Step 2: SAP（統計解析計画書）</h3>
<p>SAPはTLFの「設計図」です。どのような解析を行い、どのようなTLFを作成するかを詳細に記載します。</p>

<h3>Step 3: Shell/Mock TLF</h3>
<p>Shellは最終出力の<strong>レイアウトテンプレート</strong>です。実データの代わりにダミーデータ（xxx, xx.x等）を使用し、以下を定義します：</p>
<ul>
<li>タイトル、サブタイトル</li>
<li>列ヘッダーと行構造</li>
<li>脚注</li>
<li>ページレイアウト（縦/横、フォントサイズ）</li>
</ul>

<div class="info-box tip">
<div class="info-box-title">💡 Shellの重要性</div>
Shellは統計担当者、メディカルライター、規制部門など関係者全員の合意を得るためのコミュニケーションツールです。プログラミング開始前にShellを確定させることで、後工程での手戻りを防ぎます。
</div>

<h3>Step 4: プログラミング仕様書</h3>
<p>Shellを元に、プログラマー向けの詳細な仕様書を作成します：</p>
<table>
<thead>
<tr><th>仕様項目</th><th>内容</th></tr>
</thead>
<tbody>
<tr><td>入力データセット</td><td>使用するADaMデータセット名と変数</td></tr>
<tr><td>解析対象集団</td><td>サブセット条件（例：SAFFL='Y'）</td></tr>
<tr><td>導出ロジック</td><td>集計・計算の具体的なロジック</td></tr>
<tr><td>出力フォーマット</td><td>RTF/PDF、ページ設定、フォント</td></tr>
<tr><td>タイトル/脚注</td><td>正確な文言と条件付き脚注</td></tr>
</tbody>
</table>

<h3>Step 5-6: プログラミングとDry Run</h3>
<p>DB Lock前に、テストデータやスナップショットデータを使用して<strong>Dry Run</strong>を実施します。</p>
<ul>
<li>プログラムのロジック検証</li>
<li>出力フォーマットの確認</li>
<li>エッジケースの対応確認</li>
<li>QCとの比較・差異解消</li>
</ul>

<h3>Step 7-9: DB Lock〜最終化</h3>
<p>データベースロック後、最終データでTLFを再実行し、品質チェックを経てCSRに組み込みます。</p>

<div class="info-box warning">
<div class="info-box-title">⚠️ タイムライン管理</div>
DB Lock後のTLF最終化は通常2〜4週間と非常にタイトなスケジュールです。Dry Runの段階でプログラムを完成させておくことが成功の鍵です。
</div>

<h2>タイムラインの例</h2>
<table>
<thead>
<tr><th>マイルストーン</th><th>目安時期</th><th>TLF関連タスク</th></tr>
</thead>
<tbody>
<tr><td>SAP確定</td><td>DB Lock 3〜6ヶ月前</td><td>Shell作成開始</td></tr>
<tr><td>Shell確定</td><td>DB Lock 2〜4ヶ月前</td><td>仕様書作成・プログラミング開始</td></tr>
<tr><td>Dry Run</td><td>DB Lock 2〜4週間前</td><td>全TLFのテスト実行・QC</td></tr>
<tr><td>DB Lock</td><td>基準日</td><td>最終データでTLF再実行</td></tr>
<tr><td>TLF最終化</td><td>DB Lock 2〜4週間後</td><td>最終QC・CSR組み込み</td></tr>
</tbody>
</table>
`,
            quiz: [
                { id: "q104_1", type: "choice", question: "TLF作成の全体フローで、SAPの次に行われるステップはどれですか？", options: ["プログラミング", "Dry Run", "Shell/Mock TLFの作成", "データベースロック"], answer: 2, explanation: "SAPの次のステップはShell/Mock TLFの作成です。Shellで出力のレイアウトを定義してからプログラミングに進みます。" },
                { id: "q104_2", type: "choice", question: "データベースロック前にテストデータでTLFを実行することを何と呼びますか？", options: ["QC", "Dry Run", "Production Run", "Final Run"], answer: 1, explanation: "Dry RunはDB Lock前にテストデータやスナップショットデータを使用してTLFプログラムを実行するプロセスです。" },
                { id: "q104_3", type: "choice", question: "Shell/Mock TLFで実データの代わりに使用されるものは何ですか？", options: ["過去の試験データ", "シミュレーションデータ", "ダミーデータ（xxx, xx.x等）", "外部データ"], answer: 2, explanation: "Shellではダミーデータ（xxx, xx.x等のプレースホルダー）を使用してレイアウトを定義します。" },
                { id: "q104_4", type: "choice", question: "DB Lock後のTLF最終化に要する一般的な期間はどのくらいですか？", options: ["1〜2日", "1〜2週間", "2〜4週間", "2〜3ヶ月"], answer: 2, explanation: "DB Lock後のTLF最終化は通常2〜4週間と非常にタイトなスケジュールで行われます。" },
                { id: "q104_5", type: "fill", question: "最終出力のレイアウトテンプレートで、タイトル・列ヘッダー・脚注などを定義するものを何と呼びますか？（英語で回答）", answer: "Shell", explanation: "Shell（またはMock TLF）は最終出力のレイアウトテンプレートで、タイトル、列ヘッダー、行構造、脚注などを定義します。" }
            ]
        }
    ]
};
