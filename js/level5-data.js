/* ============================================
   TLF Academy - Level 5: TLFの設計と仕様書
   ============================================ */

const LEVEL5_DATA = {
    id: 5,
    title: "TLFの設計と仕様書",
    icon: "📝",
    description: "Shell/Mock TLF、プログラミング仕様書、出力フォーマットの標準を学ぶ",
    modules: [
        {
            id: 501,
            title: "Shell/Mock TLFの作成",
            duration: "25分",
            content: `
<h2>Shell/Mock TLFとは</h2>
<p><strong>Shell（シェル）</strong>または<strong>Mock TLF</strong>は、最終出力の<strong>レイアウトテンプレート</strong>です。実データの代わりにプレースホルダー（xxx, xx.x等）を使用し、TLFの見た目と構造を事前に定義します。</p>

<div class="info-box tip">
<div class="info-box-title">💡 Shellの目的</div>
Shellは「完成形の設計図」です。プログラミング開始前にShellを確定させることで、関係者（統計担当者、メディカルライター、規制部門）全員の合意を得ることができ、後工程での大幅な手戻りを防ぎます。
</div>

<h2>Shellの構成要素</h2>

<h3>1. ヘッダー部分</h3>
<table>
<thead>
<tr><th>要素</th><th>内容</th><th>例</th></tr>
</thead>
<tbody>
<tr><td><strong>スポンサー名</strong></td><td>製薬企業名</td><td>ABC Pharmaceutical Co., Ltd.</td></tr>
<tr><td><strong>プロトコル番号</strong></td><td>試験番号</td><td>Protocol ABC-001</td></tr>
<tr><td><strong>Table/Figure/Listing番号</strong></td><td>一意の識別番号</td><td>Table 14.1.1</td></tr>
<tr><td><strong>タイトル</strong></td><td>TLFの内容を表すタイトル</td><td>Summary of Demographics and Baseline Characteristics</td></tr>
<tr><td><strong>サブタイトル</strong></td><td>対象集団や条件の補足</td><td>Safety Population</td></tr>
</tbody>
</table>

<h3>2. ボディ部分（Tableの場合）</h3>
<table>
<thead>
<tr><th>要素</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><strong>列ヘッダー</strong></td><td>投与群名とBig N（例：Drug A (N=xxx)）</td></tr>
<tr><td><strong>行ラベル</strong></td><td>パラメータ名、カテゴリ名</td></tr>
<tr><td><strong>データセル</strong></td><td>プレースホルダー（xxx, xx.x, x (xx.x%)等）</td></tr>
<tr><td><strong>統計量セル</strong></td><td>p値等（x.xxxx）</td></tr>
</tbody>
</table>

<h3>3. フッター部分</h3>
<table>
<thead>
<tr><th>要素</th><th>内容</th><th>例</th></tr>
</thead>
<tbody>
<tr><td><strong>脚注</strong></td><td>統計手法の説明、略語の定義</td><td>[1] p-value from Chi-square test</td></tr>
<tr><td><strong>データソース</strong></td><td>使用するADaMデータセット</td><td>Source: ADSL</td></tr>
<tr><td><strong>プログラム名</strong></td><td>作成プログラムのファイル名</td><td>Program: t_dm.sas</td></tr>
<tr><td><strong>出力日時</strong></td><td>TLF生成日時</td><td>Output: ddMONyyyy hh:mm</td></tr>
</tbody>
</table>

<h2>Shellの読み方</h2>

<h3>プレースホルダーの意味</h3>
<table>
<thead>
<tr><th>プレースホルダー</th><th>意味</th><th>フォーマット</th></tr>
</thead>
<tbody>
<tr><td><strong>xxx</strong></td><td>整数</td><td>被験者数等</td></tr>
<tr><td><strong>xx.x</strong></td><td>小数1桁</td><td>割合（%）</td></tr>
<tr><td><strong>xx.xx</strong></td><td>小数2桁</td><td>平均値、SD等</td></tr>
<tr><td><strong>x.xxxx</strong></td><td>小数4桁</td><td>p値</td></tr>
<tr><td><strong>xxx (xx.x%)</strong></td><td>人数と割合</td><td>n (%)形式</td></tr>
<tr><td><strong>xx.xx (xx.xx, xx.xx)</strong></td><td>推定値と信頼区間</td><td>Mean (95% CI)</td></tr>
</tbody>
</table>

<div class="info-box warning">
<div class="info-box-title">⚠️ Shellの確定プロセス</div>
Shellは以下の関係者のレビューと承認を経て確定されます：
1. 統計解析担当者（内容の正確性）
2. メディカルライター（CSRとの整合性）
3. プログラミングリード（実装可能性）
4. 規制部門（提出要件の遵守）
Shellが確定するまでプログラミングを開始してはいけません（変更が発生すると大幅な手戻りになるため）。
</div>

<h2>Shell作成のベストプラクティス</h2>
<ul>
<li><strong>一貫性</strong>：試験全体で同じフォーマットルールを適用する</li>
<li><strong>明確なタイトル</strong>：TLFの内容が一目でわかるタイトルにする</li>
<li><strong>適切な精度</strong>：各統計量の小数桁数をSAPと一致させる</li>
<li><strong>ページ制御</strong>：A4/Letterサイズに収まるよう列数を調整する</li>
<li><strong>脚注の網羅性</strong>：略語、統計手法、特記事項を全て記載する</li>
</ul>
`,
            quiz: [
                { id: "q501_1", type: "choice", question: "Shell/Mock TLFで実データの代わりに使用されるものは何ですか？", options: ["シミュレーションデータ", "過去の試験データ", "プレースホルダー（xxx等）", "ランダムデータ"], answer: 2, explanation: "Shellではプレースホルダー（xxx, xx.x等）を使用して最終出力のレイアウトを定義します。" },
                { id: "q501_2", type: "choice", question: "Shellの列ヘッダーに表示されるBig Nは何を表しますか？", options: ["有害事象の件数", "投与群の被験者総数", "データポイントの数", "施設の数"], answer: 1, explanation: "Big N（例：Drug A (N=xxx)）は各投与群の被験者総数を表し、列ヘッダーに表示されます。" },
                { id: "q501_3", type: "choice", question: "p値のプレースホルダーとして適切なのはどれですか？", options: ["xxx", "xx.x", "xx.xx", "x.xxxx"], answer: 3, explanation: "p値は通常小数4桁で表示されるため、x.xxxxがプレースホルダーとして適切です。" },
                { id: "q501_4", type: "choice", question: "Shellを確定する前に承認を得る必要がない関係者はどれですか？", options: ["統計解析担当者", "メディカルライター", "データマネージャー", "規制部門"], answer: 2, explanation: "データマネージャーはデータクリーニングを担当しますが、通常Shellの承認プロセスには含まれません。" },
                { id: "q501_5", type: "fill", question: "TLFのヘッダーに記載される試験の識別番号を一般的に何と呼びますか？（カタカナ5文字で回答）", answer: "プロトコル", explanation: "プロトコル番号は試験を一意に識別する番号で、全てのTLFのヘッダーに記載されます。" }
            ]
        },
        {
            id: 502,
            title: "TLFプログラミング仕様書",
            duration: "25分",
            content: `
<h2>TLFプログラミング仕様書とは</h2>
<p><strong>TLFプログラミング仕様書</strong>（TLF Programming Specification）は、TLFプログラマーが参照する詳細な技術文書です。Shell/Mock TLFを具体的なプログラミング指示に変換したもので、入力データ、導出ロジック、出力フォーマットを明確に定義します。</p>

<h2>仕様書の構成要素</h2>

<h3>1. 基本情報</h3>
<table>
<thead>
<tr><th>項目</th><th>説明</th><th>例</th></tr>
</thead>
<tbody>
<tr><td><strong>TLF番号</strong></td><td>一意の識別番号</td><td>Table 14.3.1.1</td></tr>
<tr><td><strong>TLFタイトル</strong></td><td>出力のタイトル</td><td>Summary of TEAEs by SOC and PT - Safety Population</td></tr>
<tr><td><strong>対象集団</strong></td><td>使用する解析対象集団</td><td>Safety Population (SAFFL='Y')</td></tr>
<tr><td><strong>入力データセット</strong></td><td>使用するADaMデータセット</td><td>ADSL, ADAE</td></tr>
<tr><td><strong>出力形式</strong></td><td>出力フォーマット</td><td>RTF, Landscape</td></tr>
<tr><td><strong>プログラム名</strong></td><td>SASプログラムのファイル名</td><td>t_ae_teae.sas</td></tr>
</tbody>
</table>

<h3>2. データ条件（サブセット/フィルター）</h3>
<p>どのレコードを使用するかの条件を明記します。</p>
<table>
<thead>
<tr><th>条件</th><th>SASコード例</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td>対象集団</td><td><code>WHERE SAFFL = 'Y'</code></td><td>Safety Populationのみ</td></tr>
<tr><td>TEAE</td><td><code>AND TRTEMFL = 'Y'</code></td><td>治療下発現AEのみ</td></tr>
<tr><td>SOC/PT初回</td><td><code>AND AOCCPFL = 'Y'</code></td><td>SOC×PT内の初回のみ</td></tr>
</tbody>
</table>

<h3>3. 導出ロジック</h3>
<p>各統計量やセルの値をどのように計算するかの詳細ロジックです。</p>

<h4>例：有害事象テーブルの導出ロジック</h4>
<table>
<thead>
<tr><th>行</th><th>ロジック</th></tr>
</thead>
<tbody>
<tr><td>Any TEAE</td><td>TRTEMFL='Y' の被験者数（USUBJID の distinct count）</td></tr>
<tr><td>SOC行</td><td>各AEBODSYS の発現被験者数（AOCCFL='Y' でカウント）</td></tr>
<tr><td>PT行</td><td>各AEDECOD の発現被験者数（AOCPFL='Y' でカウント）</td></tr>
<tr><td>n (%)</td><td>n = 被験者数、% = n / Big N × 100（小数1桁）</td></tr>
</tbody>
</table>

<div class="info-box tip">
<div class="info-box-title">💡 Big Nの取得方法</div>
Big N（分母）はADSLから取得します：<code>SELECT COUNT(DISTINCT USUBJID) FROM ADSL WHERE SAFFL='Y'</code>。投与群別に取得し、列ヘッダーの (N=xxx) 部分に表示します。このBig Nは全ての安全性TLFで共通です。
</div>

<h3>4. 並び替えルール</h3>
<table>
<thead>
<tr><th>並び替え基準</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td>SOC：アルファベット順</td><td>AEBODSYS の昇順</td></tr>
<tr><td>PT：頻度降順</td><td>全体の発現率が高い順に並べる</td></tr>
<tr><td>PT：アルファベット順</td><td>同じ頻度の場合はアルファベット順</td></tr>
</tbody>
</table>

<h3>5. フォーマットルール</h3>
<table>
<thead>
<tr><th>項目</th><th>ルール</th><th>例</th></tr>
</thead>
<tbody>
<tr><td>被験者数（n）</td><td>右寄せ、整数</td><td>15</td></tr>
<tr><td>割合（%）</td><td>小数1桁、括弧付き</td><td>(12.5)</td></tr>
<tr><td>n (%)表示</td><td>右寄せ</td><td>15 (12.5)</td></tr>
<tr><td>0件の場合</td><td>0と表示</td><td>0</td></tr>
<tr><td>100%の場合</td><td>(100.0)ではなく(100)と表示する場合あり</td><td>仕様書に従う</td></tr>
</tbody>
</table>

<h3>6. タイトル・脚注</h3>
<p>正確な文言が仕様書に記載されます。条件付き脚注（データの状況に応じて表示/非表示が変わる脚注）も定義されます。</p>

<div class="info-box warning">
<div class="info-box-title">⚠️ 仕様書の変更管理</div>
仕様書に不明点や矛盾がある場合は、必ず統計担当者やプログラミングリードに確認してください。自己判断でロジックを解釈すると、QCで差異が発生する原因となります。仕様書の変更はバージョン管理され、変更履歴が記録されます。
</div>
`,
            quiz: [
                { id: "q502_1", type: "choice", question: "TLFプログラミング仕様書で定義されないのはどれですか？", options: ["入力データセット", "導出ロジック", "プログラムのコーディングスタイル", "出力フォーマット"], answer: 2, explanation: "プログラムのコーディングスタイル（インデント、命名規則等）は仕様書ではなく、プログラミング標準書（SOP）で定義されます。" },
                { id: "q502_2", type: "choice", question: "有害事象テーブルでBig N（分母）を取得するデータセットはどれですか？", options: ["ADAE", "ADSL", "ADLB", "ADTTE"], answer: 1, explanation: "Big NはADSLからSAFFL='Y'の被験者数として取得します。" },
                { id: "q502_3", type: "choice", question: "有害事象テーブルのPTの並び替えで一般的に使用される基準はどれですか？", options: ["アルファベット昇順のみ", "発現頻度の降順", "MedDRAコード順", "発現日の昇順"], answer: 1, explanation: "有害事象テーブルのPTは通常、全体（または特定の群）の発現頻度が高い順に並べます。" },
                { id: "q502_4", type: "choice", question: "仕様書に不明点がある場合の対応として正しいのはどれですか？", options: ["自己判断で解釈する", "プログラミングを停止する", "統計担当者やリードに確認する", "他の試験の仕様書を参照する"], answer: 2, explanation: "仕様書に不明点や矛盾がある場合は、統計担当者やプログラミングリードに確認するのが正しい対応です。" },
                { id: "q502_5", type: "fill", question: "有害事象テーブルで「治療下発現有害事象」のみを抽出するフラグ変数名は？（英語7文字で回答）", answer: "TRTEMFL", explanation: "TRTEMFL（Treatment-Emergent Flag）はTEAEを識別するフラグ変数で、'Y'でフィルタリングします。" }
            ]
        },
        {
            id: 503,
            title: "SAPからTLFへの展開",
            duration: "20分",
            content: `
<h2>SAPからTLFが生まれるまで</h2>
<p>SAP（統計解析計画書）からTLFの最終出力に至るまでには、複数の段階を経た体系的なプロセスがあります。この一連の流れを理解することは、TLFプログラマーにとって不可欠です。</p>

<h2>展開プロセスの全体像</h2>
<ol>
<li><strong>SAP</strong>：解析手法とTLFリストを定義</li>
<li><strong>Shell/Mock TLF</strong>：レイアウトテンプレートを作成</li>
<li><strong>プログラミング仕様書</strong>：詳細な技術仕様を記述</li>
<li><strong>SASプログラム</strong>：仕様書に基づきコーディング</li>
<li><strong>QCプログラム</strong>：独立した検証プログラムを作成</li>
<li><strong>最終TLF</strong>：品質確認後に確定</li>
</ol>

<h2>具体例：主要エンドポイントの展開</h2>

<h3>SAP記載内容</h3>
<table>
<thead>
<tr><th>SAP項目</th><th>記載内容</th></tr>
</thead>
<tbody>
<tr><td>主要エンドポイント</td><td>ベースラインからWeek 12のHbA1cの変化量</td></tr>
<tr><td>解析手法</td><td>MMRM（混合効果反復測定モデル）</td></tr>
<tr><td>対象集団</td><td>FAS</td></tr>
<tr><td>共変量</td><td>ベースラインHbA1c、地域</td></tr>
<tr><td>感度分析</td><td>PPS、LOCFによる解析</td></tr>
</tbody>
</table>

<h3>SAP → Shell</h3>
<p>SAPの記載を基に、以下のShellが作成されます：</p>
<ul>
<li><strong>Table 14.2.1</strong>：Change from Baseline in HbA1c at Week 12 - FAS (MMRM)</li>
<li>列：Drug A (N=xxx) | Placebo (N=xxx) | Difference (Drug A - Placebo)</li>
<li>行：n, LS Mean, SE, 95% CI, p-value</li>
</ul>

<h3>Shell → 仕様書</h3>
<p>仕様書ではShellの各セルの導出方法を具体化：</p>
<table>
<thead>
<tr><th>セル</th><th>導出方法</th></tr>
</thead>
<tbody>
<tr><td>n</td><td>FASFL='Y' AND PARAMCD='HBA1C' AND AVISIT='Week 12' AND ANL01FL='Y' の被験者数</td></tr>
<tr><td>LS Mean</td><td>PROC MIXEDの LSMEANS ステートメントから取得</td></tr>
<tr><td>SE</td><td>PROC MIXEDの LSMEANS のStandard Error</td></tr>
<tr><td>95% CI</td><td>LS Mean ± t(0.025, df) × SE</td></tr>
<tr><td>p-value</td><td>PROC MIXEDの LSMEANS DIFF の p値</td></tr>
</tbody>
</table>

<div class="info-box tip">
<div class="info-box-title">💡 LS Mean vs 算術平均</div>
主要解析テーブルでは通常<strong>LS Mean（最小二乗平均）</strong>が使用されます。LS Meanは共変量で調整された推定値であり、単純な算術平均（Arithmetic Mean）とは異なります。SASではPROC MIXEDやPROC GLMのLSMEANSステートメントで算出します。
</div>

<h2>SAPからTLFへの展開で注意すべき点</h2>

<h3>1. 欠測値の取り扱い</h3>
<table>
<thead>
<tr><th>方法</th><th>説明</th><th>TLFへの影響</th></tr>
</thead>
<tbody>
<tr><td><strong>MMRM</strong></td><td>欠測を含むデータを直接モデル化</td><td>主解析（全データ使用）</td></tr>
<tr><td><strong>LOCF</strong></td><td>最終観測値で欠測を補完</td><td>感度分析テーブル</td></tr>
<tr><td><strong>MI</strong></td><td>多重代入法</td><td>感度分析テーブル</td></tr>
<tr><td><strong>Observed Case</strong></td><td>欠測を除外</td><td>参考テーブル</td></tr>
</tbody>
</table>

<h3>2. 多重性の調整</h3>
<p>複数のエンドポイントを検定する場合、多重性の調整が必要です：</p>
<ul>
<li><strong>固定順序法（Hierarchical）</strong>：主要→副次の順に検定</li>
<li><strong>Bonferroni補正</strong>：有意水準をエンドポイント数で割る</li>
<li><strong>Hochberg法</strong>：ステップアップ手順</li>
<li><strong>Gatekeeping法</strong>：エンドポイントのファミリーごとに制御</li>
</ul>
<p>TLFでは調整前p値と調整後p値の両方を表示することがあります。</p>

<h3>3. サブグループ解析の展開</h3>
<p>SAPで定義されたサブグループごとにTLFを作成：</p>
<ul>
<li>年齢群（<65歳 vs ≥65歳）</li>
<li>性別（男性 vs 女性）</li>
<li>地域（日本 vs 日本以外）</li>
<li>ベースライン重症度</li>
</ul>

<div class="info-box warning">
<div class="info-box-title">⚠️ SAP変更の影響</div>
SAPが変更されると、Shell → 仕様書 → プログラムまで連鎖的に影響します。DB Lock後のSAP変更は特に慎重に扱い、変更がTLFに与える影響を全て評価する必要があります。TLFプログラマーはSAPのAmendmentを常に確認してください。
</div>
`,
            quiz: [
                { id: "q503_1", type: "choice", question: "SAPからTLFへの展開プロセスで、Shellの次に作成されるのはどれですか？", options: ["SASプログラム", "プログラミング仕様書", "QCプログラム", "最終TLF"], answer: 1, explanation: "展開プロセスは SAP → Shell → プログラミング仕様書 → SASプログラム → QCプログラム → 最終TLF の順です。" },
                { id: "q503_2", type: "choice", question: "共変量で調整された推定値を何と呼びますか？", options: ["算術平均", "中央値", "LS Mean（最小二乗平均）", "幾何平均"], answer: 2, explanation: "LS Mean（Least Squares Mean、最小二乗平均）は共変量で調整された推定値です。" },
                { id: "q503_3", type: "choice", question: "最終観測値で欠測を補完する方法の略称はどれですか？", options: ["MMRM", "LOCF", "MI", "OC"], answer: 1, explanation: "LOCF（Last Observation Carried Forward）は最終観測値で欠測を補完する方法です。" },
                { id: "q503_4", type: "choice", question: "SASでLS Meanを算出するプロシジャとして適切なのはどれですか？", options: ["PROC FREQ", "PROC MEANS", "PROC MIXED", "PROC LIFETEST"], answer: 2, explanation: "PROC MIXEDのLSMEANSステートメントでLS Meanを算出できます。PROC GLMも使用可能です。" },
                { id: "q503_5", type: "fill", question: "欠測を含むデータを直接モデル化する反復測定解析の略称は？（英語4文字で回答）", answer: "MMRM", explanation: "MMRM（Mixed Model for Repeated Measures）は欠測を含む反復測定データを直接モデル化する手法です。" }
            ]
        },
        {
            id: 504,
            title: "出力フォーマットの標準",
            duration: "20分",
            content: `
<h2>TLFの出力フォーマット</h2>
<p>TLFは最終的にドキュメントファイルとして出力されます。出力フォーマット、ページネーション、タイトル/脚注の規則を理解することは、品質の高いTLFを作成するために不可欠です。</p>

<h2>主要な出力フォーマット</h2>
<table>
<thead>
<tr><th>フォーマット</th><th>用途</th><th>SASでの出力方法</th><th>特徴</th></tr>
</thead>
<tbody>
<tr><td><strong>RTF</strong></td><td>CSR組み込み</td><td>ODS RTF</td><td>Word互換、編集可能、最も一般的</td></tr>
<tr><td><strong>PDF</strong></td><td>規制当局提出、レビュー</td><td>ODS PDF</td><td>レイアウト固定、改ざん防止</td></tr>
<tr><td><strong>HTML</strong></td><td>社内レビュー</td><td>ODS HTML</td><td>ブラウザで閲覧、インタラクティブ</td></tr>
<tr><td><strong>ODS Output</strong></td><td>SAS内部処理</td><td>ODS OUTPUT</td><td>データセットとして保存、後処理用</td></tr>
</tbody>
</table>

<div class="info-box tip">
<div class="info-box-title">💡 RTFが最も一般的な理由</div>
RTF形式はMicrosoft Word互換であるため、メディカルライターがCSRに組み込む際の編集が容易です。また、統計担当者やレビューアーがコメントを付与しやすいという利点もあります。最終的にPDFに変換して規制当局に提出するケースが多いです。
</div>

<h2>ページネーション（改ページ制御）</h2>

<h3>基本ルール</h3>
<table>
<thead>
<tr><th>項目</th><th>ルール</th></tr>
</thead>
<tbody>
<tr><td><strong>用紙サイズ</strong></td><td>A4またはLetter（プロジェクトにより異なる）</td></tr>
<tr><td><strong>向き</strong></td><td>Portrait（縦）またはLandscape（横）</td></tr>
<tr><td><strong>マージン</strong></td><td>通常 上下左右 1インチ（2.54cm）</td></tr>
<tr><td><strong>フォント</strong></td><td>Courier New 8-9pt（等幅フォント推奨）</td></tr>
<tr><td><strong>行間</strong></td><td>Single spacing</td></tr>
</tbody>
</table>

<h3>改ページの考慮事項</h3>
<ul>
<li><strong>タイトル/列ヘッダーの繰り返し</strong>：2ページ目以降もヘッダーを表示（(Continued)の追加）</li>
<li><strong>SOCの分割禁止</strong>：同一SOCのPTは可能な限り同じページに収める</li>
<li><strong>ぶら下がり行の回避</strong>：ページ末尾にSOCヘッダーだけが残らないようにする</li>
<li><strong>脚注の配置</strong>：最終ページのみに表示するか、全ページに表示するかを統一</li>
</ul>

<h2>タイトル/脚注の規則</h2>

<h3>タイトルの構成</h3>
<ol>
<li><strong>Line 1</strong>：スポンサー名（左寄せ）、ページ番号（右寄せ）</li>
<li><strong>Line 2</strong>：プロトコル番号</li>
<li><strong>Line 3</strong>：Table/Figure/Listing番号</li>
<li><strong>Line 4</strong>：タイトル本文</li>
<li><strong>Line 5</strong>：サブタイトル（対象集団等）</li>
</ol>

<h3>脚注の種類</h3>
<table>
<thead>
<tr><th>種類</th><th>内容</th><th>例</th></tr>
</thead>
<tbody>
<tr><td><strong>固定脚注</strong></td><td>常に表示される脚注</td><td>略語の定義、データソース</td></tr>
<tr><td><strong>条件付き脚注</strong></td><td>データの状況に応じて表示</td><td>「該当データなし」の場合の注記</td></tr>
<tr><td><strong>統計手法脚注</strong></td><td>使用した統計手法の説明</td><td>[1] p-value from ANCOVA model</td></tr>
<tr><td><strong>プログラム情報</strong></td><td>プログラム名、実行日時</td><td>Program: t_ae.sas, Output: 04MAR2026</td></tr>
</tbody>
</table>

<h2>SASでの出力設定例</h2>
<p>RTF出力の基本的なODSステートメントの構造：</p>
<ul>
<li><code>ODS RTF FILE="output.rtf" STYLE=journal;</code> - RTF出力開始</li>
<li><code>ODS ESCAPECHAR='^';</code> - 特殊文字のエスケープ設定</li>
<li><code>OPTIONS ORIENTATION=LANDSCAPE;</code> - 横向き設定</li>
<li><code>TITLE1 "Sponsor Name";</code> - タイトル行</li>
<li><code>FOOTNOTE1 "Source: ADAE";</code> - 脚注行</li>
<li><code>ODS RTF CLOSE;</code> - RTF出力終了</li>
</ul>

<div class="info-box warning">
<div class="info-box-title">⚠️ フォーマットの一貫性</div>
同一試験の全TLFで以下を統一してください：
- フォント種類・サイズ
- マージン設定
- タイトル/脚注のフォーマット
- 数値の小数桁数の表示規則
- 欠測値の表示（NE, NC, NA, -等）
プロジェクト標準テンプレート（マクロ）を使用することで一貫性を確保できます。
</div>

<h2>最近のトレンド</h2>
<ul>
<li><strong>R</strong>による出力：pharmaverse（admiral, tfrmt, rtables等）の活用が増加</li>
<li><strong>インタラクティブTLF</strong>：Shiny, plotly等を使用した動的な出力</li>
<li><strong>ADRG/define.xml</strong>との連携：メタデータ駆動型のTLF作成</li>
<li><strong>標準マクロライブラリ</strong>：企業横断的な共通マクロの開発</li>
</ul>
`,
            quiz: [
                { id: "q504_1", type: "choice", question: "CSRに組み込む際に最も一般的に使用される出力フォーマットはどれですか？", options: ["PDF", "HTML", "RTF", "ODS"], answer: 2, explanation: "RTFはMicrosoft Word互換でCSRへの組み込み・編集が容易なため、最も一般的に使用されます。" },
                { id: "q504_2", type: "choice", question: "TLFで推奨されるフォント種類はどれですか？", options: ["Arial", "Times New Roman", "Courier New", "Calibri"], answer: 2, explanation: "Courier New（等幅フォント）はデータの整列に適しており、TLFで推奨されます。" },
                { id: "q504_3", type: "choice", question: "2ページ目以降のタイトルに追加される表記はどれですか？", options: ["(Repeated)", "(Page 2)", "(Continued)", "(Next)"], answer: 2, explanation: "2ページ目以降のタイトルには(Continued)を追加して、前ページからの続きであることを示します。" },
                { id: "q504_4", type: "choice", question: "SASでRTF出力を行うためのステートメントはどれですか？", options: ["PROC PRINT", "PROC REPORT", "ODS RTF", "ODS LISTING"], answer: 2, explanation: "ODS RTF ステートメントでRTF形式のファイルを出力できます。" },
                { id: "q504_5", type: "fill", question: "R言語でのTLF作成を支援するパッケージ群の名称は？（英語10文字で回答）", answer: "pharmaverse", explanation: "pharmaverseはR言語での臨床試験データ処理・TLF作成を支援するパッケージ群（admiral, tfrmt, rtables等）です。" }
            ]
        }
    ]
};
