/*
 * Copyright 2021 European Commission
 *
 * Licensed under the EUPL, Version 1.2 or – as soon they will be approved by the European Commission - subsequent versions of the EUPL (the "Licence");
 * You may not use this work except in compliance with the Licence.
 * You may obtain a copy of the Licence at:
 *
 *     https://joinup.ec.europa.eu/software/page/eupl
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the Licence is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Licence for the specific language governing permissions and limitations under the Licence.
 */
package europa.edit.testRunner;

import europa.edit.util.SuiteListener;
import europa.edit.util.TestListener;
import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;
import org.testng.annotations.Listeners;

@CucumberOptions(
        features = {"classpath:europa/edit/features/01_CN_RepositoryBrowserPage.feature", "classpath:europa/edit/features/02_CN_ProposalViewerPage.feature", "classpath:europa/edit/features/03_CN_ExpMemo.feature", "classpath:europa/edit/features/04_CN_CouncilExplantory.feature", "classpath:europa/edit/features/05_CN_LegalAct.feature", "classpath:europa/edit/features/06_CN_Annex.feature", "classpath:europa/edit/features/07_CN_ImportFromOj.feature", "classpath:europa/edit/features/08_CN_Annotations.feature", "classpath:europa/edit/features/10_CN_CleanUp.feature"}
        ,plugin = {"pretty", "html:target/cucumber/report.html", "json:target/cucumber/reports.json", "junit:target/junit-reports/reports.xml", "com.aventstack.extentreports.cucumber.adapter.ExtentCucumberAdapter:", "rerun:target/results/failed-reports/failedTestCases.txt"}
        ,glue = {"europa/edit/stepdef"}
        ,monochrome = true
/*        ,dryRun = false,*/
/*        ,tags = "@VerifyRepositoryBrowserPage"*/
)

@Listeners({SuiteListener.class, TestListener.class})
public class CN_RegressionTestRunner extends AbstractTestNGCucumberTests {
}