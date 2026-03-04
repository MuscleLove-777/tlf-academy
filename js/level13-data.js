/* ============================================
   TLF Academy - Level 13: 規制要件と提出プロセス
   ============================================ */

const LEVEL13_DATA = {
    id: 13,
    title: "規制要件と提出プロセス",
    icon: "🏛️",
    description: "ICH E3ガイドラインやFDA/PMDA等の規制要件、TLFの提出プロセスを理解する",
    modules: [
        {
            id: 1301,
            title: "ICH E3ガイドラインとTLF",
            duration: "25分",
            content: `
<h2>ICH E3ガイドラインとは</h2>
<p><strong>ICH E3</strong>（Structure and Content of Clinical Study Reports）は、臨床試験報告書（CSR: Clinical Study Report）の構成と内容を規定する国際的なガイドラインです。このガイドラインに基づいて、CSRに含めるべきTLFの種類と配置が決まります。</p>

<h2>CSRの構成とTLFの配置</h2>
<table>
<thead>
<tr><th>セクション</th><th>内容</th><th>TLFの種類</th></tr>
</thead>
<tbody>
<tr><td><strong>11. 有効性の評価</strong></td><td>有効性解析結果</td><td>主要エンドポイントの表・図</td></tr>
<tr><td><strong>12. 安全性の評価</strong></td><td>安全性解析結果</td><td>AE要約表、臨床検査値表</td></tr>
<tr><td><strong>14. 参考文献</strong></td><td>引用文献</td><td>-</td></tr>
<tr><td><strong>14.1</strong></td><td>人口統計学的特性</td><td>Table 14.1.x</td></tr>
<tr><td><strong>14.2</strong></td><td>有効性データ</td><td>Table/Figure 14.2.x</td></tr>
<tr><td><strong>14.3</strong></td><td>安全性データ</td><td>Table/Figure 14.3.x</td></tr>
<tr><td><strong>16.2</strong></td><td>個別被験者データ一覧</td><td>Listing 16.2.x</td></tr>
</tbody>
</table>

<h2>本文中のTLF（In-text TLF）</h2>
<p>CSR本文のセクション11（有効性）およびセクション12（安全性）に直接挿入されるTLFです。</p>

<table>
<thead>
<tr><th>カテゴリ</th><th>代表的なTLF</th><th>必須度</th></tr>
</thead>
<tbody>
<tr><td><strong>人口統計</strong></td><td>被験者の内訳（Disposition）、人口統計学的特性</td><td>必須</td></tr>
<tr><td><strong>有効性</strong></td><td>主要エンドポイントの解析結果、KM曲線</td><td>必須</td></tr>
<tr><td><strong>安全性</strong></td><td>有害事象要約、重篤な有害事象、臨床検査値</td><td>必須</td></tr>
<tr><td><strong>薬物動態</strong></td><td>PK パラメータ要約、濃度推移</td><td>該当時</td></tr>
</tbody>
</table>

<h2>付録のTLF（Appendix TLF）</h2>
<p>セクション14（Tables and Figures）とセクション16（Listings）に配置される詳細なTLFです。</p>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">TLF番号体系の例</span>
</div>
<pre><code>Section 14.1 - Demographics and Baseline
  Table 14.1.1  Subject Disposition
  Table 14.1.2  Demographics Summary
  Table 14.1.3  Baseline Characteristics
  Table 14.1.4  Medical History

Section 14.2 - Efficacy
  Table 14.2.1  Primary Endpoint Analysis
  Table 14.2.2  Secondary Endpoint Analysis
  Figure 14.2.1 Kaplan-Meier Plot
  Figure 14.2.2 Forest Plot of Subgroups

Section 14.3 - Safety
  Table 14.3.1  Overall AE Summary
  Table 14.3.2  AE by SOC and PT
  Table 14.3.3  SAE Summary
  Table 14.3.4  Laboratory Abnormalities
  Figure 14.3.1 Liver Function Tests (Hy's Law)

Section 16.2 - Individual Patient Listings
  Listing 16.2.1  Demographics
  Listing 16.2.4  Adverse Events
  Listing 16.2.5  Laboratory Data
  Listing 16.2.7  Concomitant Medications</code></pre>
</div>

<h2>必須TLFリスト</h2>
<p>ICH E3に基づく、一般的な臨床試験で必要とされる主要TLFです。</p>

<table>
<thead>
<tr><th>TLF番号</th><th>タイトル</th><th>タイプ</th></tr>
</thead>
<tbody>
<tr><td>T 14.1.1</td><td>Subject Disposition</td><td>Table</td></tr>
<tr><td>T 14.1.2</td><td>Demographics and Baseline Characteristics</td><td>Table</td></tr>
<tr><td>T 14.2.1</td><td>Primary Efficacy Endpoint</td><td>Table</td></tr>
<tr><td>T 14.3.1</td><td>Overall Summary of Adverse Events</td><td>Table</td></tr>
<tr><td>T 14.3.2</td><td>AEs by System Organ Class and Preferred Term</td><td>Table</td></tr>
<tr><td>T 14.3.3</td><td>Serious Adverse Events</td><td>Table</td></tr>
<tr><td>F 14.2.1</td><td>Kaplan-Meier Plot（該当する場合）</td><td>Figure</td></tr>
<tr><td>L 16.2.4</td><td>Listing of Adverse Events</td><td>Listing</td></tr>
<tr><td>L 16.2.5</td><td>Listing of Laboratory Data</td><td>Listing</td></tr>
</tbody>
</table>

<div class="info-box tip">
<div class="info-box-title">💡 TLF番号の命名規則</div>
TLF番号はCSRのセクション番号に対応しています：
<ul>
<li><strong>T（Table）</strong>：T 14.1.1 → セクション14.1の1番目のテーブル</li>
<li><strong>F（Figure）</strong>：F 14.2.1 → セクション14.2の1番目の図</li>
<li><strong>L（Listing）</strong>：L 16.2.4 → セクション16.2の4番目のリスティング</li>
</ul>
</div>

<div class="info-box warning">
<div class="info-box-title">⚠️ CSR構成の注意点</div>
<ul>
<li>ICH E3は最低限のガイドラインであり、各企業はさらに詳細な内部基準を設けている</li>
<li>試験デザイン（腫瘍学、ワクチン、希少疾患等）によって必要なTLFは大幅に異なる</li>
<li>SAPに定義されたTLFリストが、実際に作成するTLFの根拠となる</li>
<li>ICH E3は1995年に策定されたガイドラインであり、改訂の議論が進行中</li>
</ul>
</div>
`,
            quiz: [
                { id: "q1301_1", type: "choice", question: "ICH E3ガイドラインが規定するのは何の構成と内容ですか？", options: ["治験薬概要書（IB）", "治験実施計画書（Protocol）", "臨床試験報告書（CSR）", "統計解析計画書（SAP）"], answer: 2, explanation: "ICH E3はCSR（Clinical Study Report）の構成と内容を規定するガイドラインです。CSRに含めるべきTLFの種類と配置もこのガイドラインに基づきます。" },
                { id: "q1301_2", type: "choice", question: "CSRのセクション14.3に配置されるTLFのカテゴリはどれですか？", options: ["人口統計学的特性", "有効性データ", "安全性データ", "薬物動態データ"], answer: 2, explanation: "セクション14.3には安全性データに関するTLF（AE要約表、臨床検査値、バイタルサイン等）が配置されます。" },
                { id: "q1301_3", type: "choice", question: "個別被験者データのListingが配置されるCSRセクションはどれですか？", options: ["14.1", "14.3", "15", "16.2"], answer: 3, explanation: "個別被験者データのListing（人口統計、有害事象、検査値等）はCSRのセクション16.2に配置されます。" },
                { id: "q1301_4", type: "choice", question: "ほぼ全ての臨床試験で必須とされるTLFはどれですか？", options: ["Forest Plot", "Subject Disposition", "Swimmer Plot", "PKパラメータ表"], answer: 1, explanation: "Subject Disposition（被験者の内訳）はほぼ全ての臨床試験のCSRで必須のTLFです。スクリーニング→ランダム化→完了/中止の流れを示します。" },
                { id: "q1301_5", type: "fill", question: "ICH E3ガイドラインの正式名称は Structure and Content of Clinical ___ Reports です。", answer: "Study", explanation: "ICH E3の正式名称は「Structure and Content of Clinical Study Reports」（臨床試験報告書の構成と内容）です。" }
            ]
        },
        {
            id: 1302,
            title: "FDA/EMA/PMDAの提出要件",
            duration: "30分",
            content: `
<h2>eCTD（Electronic Common Technical Document）</h2>
<p><strong>eCTD</strong>は、規制当局への医薬品承認申請の電子的提出形式です。ICH M8で定義され、FDA・EMA・PMDAをはじめとする各国の規制当局が採用しています。</p>

<h2>eCTDの構成</h2>
<table>
<thead>
<tr><th>モジュール</th><th>内容</th><th>TLF関連</th></tr>
</thead>
<tbody>
<tr><td><strong>Module 1</strong></td><td>行政情報（リージョナル）</td><td>-</td></tr>
<tr><td><strong>Module 2</strong></td><td>CTDサマリー</td><td>要約TLF</td></tr>
<tr><td><strong>Module 3</strong></td><td>品質（CMC）</td><td>-</td></tr>
<tr><td><strong>Module 4</strong></td><td>非臨床試験</td><td>非臨床TLF</td></tr>
<tr><td><strong>Module 5</strong></td><td>臨床試験</td><td>臨床試験TLF</td></tr>
</tbody>
</table>

<h2>Module 5のTLF配置</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">eCTD Module 5 構造</span>
</div>
<pre><code>Module 5: Clinical Study Reports
├── 5.3.5.1 - Reports of Controlled Clinical Studies
│   └── study-abc-001/
│       ├── m5351-body.pdf        (CSR本文)
│       ├── m5351-tables.pdf      (Section 14: Tables/Figures)
│       ├── m5351-listings.pdf    (Section 16.2: Listings)
│       └── datasets/
│           ├── sdtm/             (SDTMデータセット)
│           │   ├── dm.xpt
│           │   ├── ae.xpt
│           │   └── define.xml
│           ├── adam/             (ADaMデータセット)
│           │   ├── adsl.xpt
│           │   ├── adae.xpt
│           │   └── define.xml
│           └── programs/        (解析プログラム)
│               ├── t_14_1_1.sas
│               └── f_14_2_1.sas</code></pre>
</div>

<h2>FDA固有の要件</h2>
<table>
<thead>
<tr><th>要件</th><th>詳細</th></tr>
</thead>
<tbody>
<tr><td><strong>データ形式</strong></td><td>SAS Transport v5（.xpt）、今後Dataset-JSONへ移行予定</td></tr>
<tr><td><strong>CDISC標準</strong></td><td>SDTM IG 3.2以上、ADaM IG 1.1以上</td></tr>
<tr><td><strong>Define-XML</strong></td><td>Define-XML 2.0以上が必須</td></tr>
<tr><td><strong>SDRG</strong></td><td>Study Data Reviewer's Guide（データセット説明書）</td></tr>
<tr><td><strong>ADRG</strong></td><td>Analysis Data Reviewer's Guide（解析データ説明書）</td></tr>
<tr><td><strong>ファイルサイズ</strong></td><td>XPTファイルは5GB以下</td></tr>
<tr><td><strong>PDF仕様</strong></td><td>PDF/A形式、ブックマーク付き、テキスト検索可能</td></tr>
</tbody>
</table>

<h2>EMA固有の要件</h2>
<table>
<thead>
<tr><th>要件</th><th>詳細</th></tr>
</thead>
<tbody>
<tr><td><strong>データ形式</strong></td><td>SAS Transport v5（.xpt）</td></tr>
<tr><td><strong>CDISC標準</strong></td><td>SDTM/ADaM推奨（義務化は段階的）</td></tr>
<tr><td><strong>EU CTR</strong></td><td>EU Clinical Trials Regulation対応</td></tr>
<tr><td><strong>透明性</strong></td><td>CSR要約の公開が必要</td></tr>
</tbody>
</table>

<h2>PMDA（日本）固有の要件</h2>
<table>
<thead>
<tr><th>要件</th><th>詳細</th></tr>
</thead>
<tbody>
<tr><td><strong>データ形式</strong></td><td>SAS Transport v5（.xpt）</td></tr>
<tr><td><strong>CDISC標準</strong></td><td>2020年4月以降、CDISC標準を原則義務化</td></tr>
<tr><td><strong>電子データ提出</strong></td><td>ゲートウェイを通じた電子提出</td></tr>
<tr><td><strong>日本語対応</strong></td><td>TLFは日本語・英語両方が必要な場合あり</td></tr>
<tr><td><strong>技術的適合性確認</strong></td><td>PMDA独自のバリデーションチェック</td></tr>
</tbody>
</table>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* XPTファイルの出力（FDA提出用） */
libname xptout xport "C:/submission/datasets/adam/adsl.xpt";

proc copy in=adam out=xptout;
  select adsl;
run;

libname xptout clear;

/* 注意: XPT v5の制限 */
/* - 変数名は8文字以内 */
/* - ラベルは40文字以内 */
/* - ファイルサイズは5GB以下 */
/* - 観測数は最大2^31-1 */</code></pre>
</div>

<div class="info-box tip">
<div class="info-box-title">💡 グローバル提出戦略</div>
同時に複数の規制当局（FDA、EMA、PMDA等）に提出する場合：
<ul>
<li>共通のCDISCデータセットを基盤とする</li>
<li>リージョナル要件の差異をマッピングする</li>
<li>TLFはグローバル版（英語）とリージョナル版（日本語等）を準備</li>
<li>eCTDのリージョナルモジュール（Module 1）は各国別に作成</li>
</ul>
</div>

<div class="info-box warning">
<div class="info-box-title">⚠️ 提出前の確認事項</div>
<ul>
<li>FDA Data Standards Catalogで最新の推奨バージョンを確認</li>
<li>Pinnacle 21（OpenCDISC）によるバリデーションを必ず実施</li>
<li>PDFのハイパーリンクとブックマークが正常に機能するか確認</li>
<li>全てのTLFがSAPに定義されたリストと一致するか照合</li>
</ul>
</div>
`,
            quiz: [
                { id: "q1302_1", type: "choice", question: "eCTDで臨床試験のTLFが配置されるモジュールはどれですか？", options: ["Module 2", "Module 3", "Module 4", "Module 5"], answer: 3, explanation: "Module 5（Clinical Study Reports）に臨床試験のCSR本文、TLF、データセット、解析プログラムが配置されます。" },
                { id: "q1302_2", type: "choice", question: "FDAへのデータ提出で現在標準的に使用されるファイル形式はどれですか？", options: ["SAS7BDAT", "CSV", "SAS Transport v5（XPT）", "JSON"], answer: 2, explanation: "FDAへの提出にはSAS Transport v5形式（.xpt）が標準です。今後Dataset-JSONへの移行が予定されていますが、現時点ではXPTが標準です。" },
                { id: "q1302_3", type: "choice", question: "PMDAがCDISC標準データの提出を原則義務化したのはいつからですか？", options: ["2016年12月", "2018年4月", "2020年4月", "2022年1月"], answer: 2, explanation: "PMDAは2020年4月以降の新医薬品承認申請について、CDISC標準によるデータ提出を原則義務化しました。" },
                { id: "q1302_4", type: "choice", question: "FDAへの提出でXPTファイルの最大サイズ制限はどれですか？", options: ["1GB", "2GB", "5GB", "10GB"], answer: 2, explanation: "FDAはXPTファイルのサイズ上限を5GBとしています。これを超える場合はファイルの分割が必要です。" },
                { id: "q1302_5", type: "fill", question: "規制当局への電子的提出の国際標準形式の略称は ___ です。", answer: "eCTD", explanation: "eCTD（Electronic Common Technical Document）は、ICH M8で定義された医薬品承認申請の電子提出形式です。" }
            ]
        },
        {
            id: 1303,
            title: "Pinnacle 21とバリデーション",
            duration: "30分",
            content: `
<h2>Pinnacle 21（旧OpenCDISC）とは</h2>
<p><strong>Pinnacle 21</strong>は、CDISC標準への適合性を検証するバリデーションツールです。FDAは提出前にPinnacle 21による検証を強く推奨しており、事実上の標準ツールとなっています。</p>

<h2>Pinnacle 21の製品群</h2>
<table>
<thead>
<tr><th>製品</th><th>用途</th><th>対象ユーザー</th></tr>
</thead>
<tbody>
<tr><td><strong>Pinnacle 21 Community</strong></td><td>無償版バリデーションツール</td><td>全般</td></tr>
<tr><td><strong>Pinnacle 21 Enterprise</strong></td><td>組織向けクラウド版</td><td>企業・CRO</td></tr>
<tr><td><strong>FDA Validator</strong></td><td>FDA内部での検証</td><td>FDA審査官</td></tr>
</tbody>
</table>

<h2>バリデーションチェックの種類</h2>
<table>
<thead>
<tr><th>チェックID</th><th>カテゴリ</th><th>説明</th><th>重要度</th></tr>
</thead>
<tbody>
<tr><td>SD0001-SD9999</td><td>SDTM</td><td>SDTMデータの構造・内容チェック</td><td>様々</td></tr>
<tr><td>AD0001-AD9999</td><td>ADaM</td><td>ADaMデータの構造・内容チェック</td><td>様々</td></tr>
<tr><td>DD0001-DD9999</td><td>Define-XML</td><td>Define-XMLの整合性チェック</td><td>様々</td></tr>
<tr><td>CT0001-CT9999</td><td>CT</td><td>Controlled Terminologyの適合性</td><td>様々</td></tr>
</tbody>
</table>

<h2>チェック結果の重要度レベル</h2>
<table>
<thead>
<tr><th>レベル</th><th>説明</th><th>対応</th></tr>
</thead>
<tbody>
<tr><td><strong>Error</strong></td><td>CDISC標準への明確な違反</td><td>必ず修正</td></tr>
<tr><td><strong>Warning</strong></td><td>潜在的な問題</td><td>調査・対応を推奨</td></tr>
<tr><td><strong>Notice</strong></td><td>情報提供レベル</td><td>確認のみ</td></tr>
<tr><td><strong>Reject</strong></td><td>FDAが受理を拒否する問題</td><td>必ず修正</td></tr>
</tbody>
</table>

<h2>Define-XML</h2>
<p><strong>Define-XML</strong>は、提出データセットのメタデータ（変数定義、コードリスト、計算アルゴリズム等）を記述するXMLファイルです。</p>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">XML</span>
</div>
<pre><code class="language-xml">&lt;!-- Define-XML 2.0 の構造例 --&gt;
&lt;ODM xmlns="http://www.cdisc.org/ns/odm/v1.3"
     FileType="Snapshot"
     FileOID="DEF.STUDY.ABC001"&gt;
  &lt;Study OID="STUDY.ABC001"&gt;
    &lt;MetaDataVersion OID="CDISC.ADaM.1.1"&gt;

      &lt;!-- データセット定義 --&gt;
      &lt;ItemGroupDef OID="IG.ADSL"
                    Name="ADSL"
                    Repeating="No"
                    Purpose="Analysis"
                    def:Structure="One record per subject"&gt;
        &lt;ItemRef ItemOID="IT.ADSL.STUDYID" OrderNumber="1"
                 Mandatory="Yes" /&gt;
        &lt;ItemRef ItemOID="IT.ADSL.USUBJID" OrderNumber="2"
                 Mandatory="Yes" KeySequence="1" /&gt;
        &lt;ItemRef ItemOID="IT.ADSL.AGE" OrderNumber="3"
                 Mandatory="No" /&gt;
      &lt;/ItemGroupDef&gt;

      &lt;!-- 変数定義 --&gt;
      &lt;ItemDef OID="IT.ADSL.AGE"
              Name="AGE"
              DataType="integer"
              Length="8"
              def:Label="Age"&gt;
        &lt;def:Origin Type="Predecessor"&gt;
          &lt;Description&gt;
            &lt;TranslatedText&gt;DM.AGE&lt;/TranslatedText&gt;
          &lt;/Description&gt;
        &lt;/def:Origin&gt;
      &lt;/ItemDef&gt;

    &lt;/MetaDataVersion&gt;
  &lt;/Study&gt;
&lt;/ODM&gt;</code></pre>
</div>

<h2>Pinnacle 21の実行と結果解釈</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">バリデーション結果レポート例</span>
</div>
<pre><code>Pinnacle 21 Validation Report
=============================
Standard: ADaM IG v1.1
CT Version: 2024-03-29

Summary:
  Errors:   3
  Warnings: 12
  Notices:  45

Top Issues:
  AD0092 [Error]   ADSL: TRTSDT format should be date
  AD0125 [Error]   ADAE: AEDECOD not in MedDRA
  AD0044 [Warning] ADLB: Missing DTYPE when AVAL is derived
  DD0014 [Warning] Define-XML: ComputationMethod missing
  CT0001 [Notice]  Non-standard CT value found</code></pre>
</div>

<h2>形式チェックとデータ整合性</h2>
<ol>
<li><strong>構造チェック</strong>：変数名・型・長さがCDISC標準に適合しているか</li>
<li><strong>内容チェック</strong>：必須変数の欠測、不正な値、CTとの不一致</li>
<li><strong>整合性チェック</strong>：データセット間の参照整合性（例: ADAEのUSUBJIDがADSLに存在するか）</li>
<li><strong>Define-XMLチェック</strong>：メタデータとデータセットの整合性</li>
</ol>

<div class="info-box tip">
<div class="info-box-title">💡 バリデーション対応のベストプラクティス</div>
<ul>
<li>開発初期からPinnacle 21を定期実行し、問題の早期発見に努める</li>
<li>全てのErrorとRejectは提出前に解消する</li>
<li>解消できないWarningにはSDRG/ADRGで合理的な説明を記載する</li>
<li>FDAのBusiness Rulesを確認し、Reject対象のチェックを優先対応する</li>
</ul>
</div>

<div class="info-box warning">
<div class="info-box-title">⚠️ よくあるバリデーションエラー</div>
<ul>
<li>日付変数のフォーマット不正（ISO 8601準拠が必要）</li>
<li>Controlled Terminologyに存在しない値の使用</li>
<li>必須変数（STUDYID, USUBJID等）の欠測</li>
<li>XPT変数名の8文字制限超過</li>
<li>Define-XMLとデータセットのメタデータ不一致</li>
</ul>
</div>
`,
            quiz: [
                { id: "q1303_1", type: "choice", question: "Pinnacle 21のバリデーション結果で、FDAが提出を受理しない問題のレベルはどれですか？", options: ["Error", "Warning", "Notice", "Reject"], answer: 3, explanation: "Reject レベルの問題は、FDAが提出データの受理を拒否する可能性がある最も深刻な問題です。提出前に必ず解消する必要があります。" },
                { id: "q1303_2", type: "choice", question: "Define-XMLが記述するのは何ですか？", options: ["臨床試験の実施計画", "提出データセットのメタデータ", "有害事象のコーディング辞書", "統計解析の手順"], answer: 1, explanation: "Define-XMLは提出データセットのメタデータ（変数定義、コードリスト、計算アルゴリズム、データソース等）を記述するXMLファイルです。" },
                { id: "q1303_3", type: "choice", question: "Pinnacle 21のWarningレベルの問題に対する適切な対応はどれですか？", options: ["全て無視してよい", "必ず全て修正する", "調査し、解消できないものはSDRG/ADRGで説明する", "FDAに報告する"], answer: 2, explanation: "Warningは調査・対応が推奨されますが、合理的な理由で解消できない場合はSDRG（Study Data Reviewer's Guide）やADRGに説明を記載します。" },
                { id: "q1303_4", type: "choice", question: "Pinnacle 21によるバリデーションで「CTチェック」が検証するのはどれですか？", options: ["コンピュータ断層撮影の画像品質", "Controlled Terminology（標準用語）の適合性", "Clinical Trial登録の有無", "連結テスト（Connectivity Test）"], answer: 1, explanation: "CTチェックは、CDISC Controlled Terminology（標準コードリスト）に定義された値がデータセットで正しく使用されているかを検証します。" },
                { id: "q1303_5", type: "fill", question: "Pinnacle 21の旧称は ___ です。", answer: "OpenCDISC", explanation: "Pinnacle 21は以前OpenCDISCと呼ばれていたCDISCバリデーションツールです。現在はPinnacle 21 by Certara として製品化されています。" }
            ]
        },
        {
            id: 1304,
            title: "TLFの最新トレンド",
            duration: "25分",
            content: `
<h2>TLF領域の変革</h2>
<p>臨床試験のTLF作成は、技術革新と規制環境の変化により大きな転換期を迎えています。AI/ML、新しいデータ形式、対話型レポート、R言語の台頭など、複数のトレンドが同時に進行しています。</p>

<h2>AI/MLの活用</h2>
<table>
<thead>
<tr><th>活用領域</th><th>説明</th><th>成熟度</th></tr>
</thead>
<tbody>
<tr><td><strong>コード生成支援</strong></td><td>LLM（ChatGPT/Claude等）によるSAS/Rコードの自動生成</td><td>実用段階</td></tr>
<tr><td><strong>TLFシェル自動生成</strong></td><td>SAPからTLFシェル（モックアップ）を自動作成</td><td>開発段階</td></tr>
<tr><td><strong>QC自動化</strong></td><td>AIによるTLF出力の自動比較・異常検知</td><td>研究段階</td></tr>
<tr><td><strong>データ品質チェック</strong></td><td>MLモデルによるデータ異常の自動検出</td><td>開発段階</td></tr>
<tr><td><strong>プログラミング効率化</strong></td><td>コード補完、バグ検出、最適化提案</td><td>実用段階</td></tr>
</tbody>
</table>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">AI活用の例: SAPテキストからSASコード生成</span>
</div>
<pre><code>【SAP仕様】
"Table 14.1.2: Demographics summary by treatment group
for the Safety Population. Display n, Mean (SD), Median,
Min-Max for continuous variables and n (%) for categorical
variables."

【AI生成コード（人間によるレビュー・修正が必要）】
→ PROC REPORT + マクロを使用した人口統計テーブルの
  SASプログラムが自動生成される</code></pre>
</div>

<div class="info-box warning">
<div class="info-box-title">⚠️ AI活用の注意点</div>
<ul>
<li>AI生成コードは必ず人間がレビュー・検証する必要がある</li>
<li>機密の臨床データをクラウドAIサービスに送信しない</li>
<li>AI生成物のバリデーション記録を残す</li>
<li>規制当局はAI活用に関するガイダンスを策定中</li>
</ul>
</div>

<h2>TLF自動生成ツール</h2>
<table>
<thead>
<tr><th>ツール</th><th>特徴</th><th>言語</th></tr>
</thead>
<tbody>
<tr><td><strong>chevron（pharmaverse）</strong></td><td>標準TLFテンプレートライブラリ</td><td>R</td></tr>
<tr><td><strong>Tplyr</strong></td><td>宣言的TLF生成</td><td>R</td></tr>
<tr><td><strong>falcon</strong></td><td>標準安全性テーブル自動生成</td><td>R</td></tr>
<tr><td><strong>SAS Clinical Standards Toolkit</strong></td><td>SAS公式の臨床標準ツール</td><td>SAS</td></tr>
<tr><td><strong>メタデータ駆動型アプローチ</strong></td><td>TLFメタデータからプログラムを動的生成</td><td>SAS/R</td></tr>
</tbody>
</table>

<h2>Dataset-JSON</h2>
<p><strong>Dataset-JSON</strong>はCDISCが開発した新しいデータ交換形式で、従来のSAS Transport v5（XPT）に代わることが期待されています。</p>

<table>
<thead>
<tr><th>特徴</th><th>XPT (SAS Transport v5)</th><th>Dataset-JSON</th></tr>
</thead>
<tbody>
<tr><td>変数名長</td><td>8文字制限</td><td>制限なし</td></tr>
<tr><td>ラベル長</td><td>40文字制限</td><td>制限なし（実質的に）</td></tr>
<tr><td>ファイルサイズ</td><td>5GB制限</td><td>柔軟</td></tr>
<tr><td>SAS依存</td><td>あり</td><td>なし（オープン形式）</td></tr>
<tr><td>メタデータ</td><td>限定的</td><td>Define-XMLと統合可能</td></tr>
<tr><td>ツール対応</td><td>広範</td><td>拡大中</td></tr>
</tbody>
</table>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">JSON</span>
</div>
<pre><code class="language-json">{
  "datasetJSONVersion": "1.1.0",
  "fileOID": "ADSL",
  "studyOID": "STUDY.ABC001",
  "metaDataVersionOID": "MDV.1",
  "itemGroupOID": "IG.ADSL",
  "records": 254,
  "name": "ADSL",
  "label": "Subject-Level Analysis Dataset",
  "columns": [
    {"itemOID": "IT.STUDYID", "name": "STUDYID",
     "label": "Study Identifier", "dataType": "string"},
    {"itemOID": "IT.USUBJID", "name": "USUBJID",
     "label": "Unique Subject Identifier", "dataType": "string"},
    {"itemOID": "IT.AGE", "name": "AGE",
     "label": "Age", "dataType": "integer"}
  ],
  "rows": [
    ["ABC001", "ABC001-001", 65],
    ["ABC001", "ABC001-002", 42]
  ]
}</code></pre>
</div>

<h2>Interactive TLF</h2>
<p>従来の静的PDF/RTFに加えて、<strong>対話型（Interactive）TLF</strong>が注目されています。</p>

<table>
<thead>
<tr><th>技術</th><th>特徴</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td><strong>Shiny（teal）</strong></td><td>Rベースの対話型Webアプリ</td><td>社内レビュー、探索的解析</td></tr>
<tr><td><strong>Spotfire / JMP</strong></td><td>商用BIツール</td><td>安全性モニタリング</td></tr>
<tr><td><strong>HTML + JavaScript</strong></td><td>Webベースの対話型レポート</td><td>CSR補足資料</td></tr>
<tr><td><strong>Quarto Dashboard</strong></td><td>コード連携ダッシュボード</td><td>データ探索</td></tr>
</tbody>
</table>

<h2>R-based Submission</h2>
<p>R言語による規制当局への提出（R-based Submission）の動きが加速しています。</p>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">R Submissions Working Group の進捗</span>
</div>
<pre><code>Pilot 1 (2021): R + Shinyアプリの提出 → FDAが受理・レビュー完了
Pilot 2 (2022): ADaMデータセット + R解析プログラムの提出
Pilot 3 (2023): WebAssemblyによるShinyアプリの提出
Pilot 4 (2024): コンテナベース環境での提出

→ FDAはR言語による提出を正式に受け入れる姿勢を示している</code></pre>
</div>

<div class="info-box tip">
<div class="info-box-title">💡 今後のキャリアに向けて</div>
TLFプログラマーに今後求められるスキル：
<ul>
<li><strong>SASとR の両方</strong>のスキル</li>
<li>Dataset-JSONなど新データ形式への対応</li>
<li>CI/CD・Gitなどのモダン開発ツールの活用</li>
<li>AI/MLツールを活用した効率的なプログラミング</li>
<li>バリデーションとGxPコンプライアンスの知識</li>
<li>メタデータ駆動型アプローチの理解</li>
</ul>
</div>

<div class="info-box warning">
<div class="info-box-title">⚠️ 変革期における注意</div>
<ul>
<li>新しい技術の採用は段階的に行い、バリデーション体制を整備する</li>
<li>SASはすぐに不要にはならない - 既存システムとの共存が続く</li>
<li>規制当局のガイダンスの更新を常に追跡する</li>
<li>業界標準（PHUSE、CDISC Working Group等）の動向に注目する</li>
</ul>
</div>
`,
            quiz: [
                { id: "q1304_1", type: "choice", question: "CDISC Dataset-JSONがSAS Transport v5（XPT）に対して改善した主な点はどれですか？", options: ["実行速度の向上", "変数名の8文字制限の撤廃", "データの暗号化", "圧縮アルゴリズムの改良"], answer: 1, explanation: "Dataset-JSONでは、XPTの8文字変数名制限と40文字ラベル制限が撤廃され、より記述的な変数名の使用が可能になります。" },
                { id: "q1304_2", type: "choice", question: "R Submissions Working GroupのPilot 1でFDAに提出されたものは何ですか？", options: ["SASプログラムのみ", "R + Shinyアプリ", "Pythonスクリプト", "Dataset-JSONファイル"], answer: 1, explanation: "Pilot 1（2021年）では、R言語で作成した解析結果とShinyアプリケーションがFDAに提出され、FDAによるレビューが完了しました。" },
                { id: "q1304_3", type: "choice", question: "AI/MLによるTLFコード生成で最も重要な注意点はどれですか？", options: ["AIが生成したコードは常に正しい", "処理速度が遅い", "必ず人間がレビュー・検証する必要がある", "SASコードは生成できない"], answer: 2, explanation: "AI生成コードは有用ですが、臨床試験データの正確性が求められるため、必ず人間によるレビューと検証が不可欠です。" },
                { id: "q1304_4", type: "choice", question: "pharmaverseで標準安全性テーブルの自動生成を行うパッケージはどれですか？", options: ["admiral", "rtables", "falcon", "teal"], answer: 2, explanation: "falconパッケージは、臨床試験でよく使用される標準安全性テーブル（AE要約、人口統計等）を自動生成するためのパッケージです。" },
                { id: "q1304_5", type: "fill", question: "XPTに代わるCDISCの新しいデータ交換形式は Dataset-___ です。", answer: "JSON", explanation: "Dataset-JSONはCDISCが開発した新しいデータ交換形式で、SAS Transport v5（XPT）の制限を解消し、SAS非依存のオープンフォーマットです。" }
            ]
        }
    ]
};
