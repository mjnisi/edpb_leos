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
package eu.europa.ec.leos.services.support.xml;

import eu.europa.ec.leos.domain.common.Result;
import eu.europa.ec.leos.services.support.xml.ref.Ref;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;

import java.util.Arrays;

import static org.junit.Assert.assertEquals;

/** Article 46 used for the unnumbered paragraph:
 * first paragraph (a5_sdplN0)
 *      sub-paragraph (a5_Bxi62k)
 *          (a) point  (a5_fQYvU7)
 * 		    (b) point  (a5_lwMbkL)
 *          (c) point  (a5_v0SBeN)
 * 		    (d) point  (a5_bSsbTj)
 *              sub-point  (a5_T0L37f)
 *              (1) point  (a5_TcYL6X)
 * 			    (2) point  (a5_Vdotsh)
 *              (3) point  (a5_jlazVX)
 *                  sub-point   (a5_nmQFmM)
 *                  (i) point   (a5_HTmAdx)
 * 				    (ii) point  (a5_oFgu8x)
 *                  (iii) point (a5_W9FxgJ)
 * 				    (iv) point  (a5_Pxc9VZ)
 *                      sub-point (a5_csTSSU)
 * 					    - indent  (a5_A8TAMj)
 * 					    - indent  (a5_51QZD5)
 * 					    - indent  (a5_IktngU)
 * 					(v) point   (a5_2Y0ygz)
 * 			            sub-point (a5_JXc2nY)
 * 			            - indent  (a5_nirQOI)
 * 			            - indent  (a5_4Lmhzh)
 * second paragraph (a5_FeJW6z)
 * third paragraph  (art_5_TxunI0)
 * fourth paragraph (art_5_A42pW6)
 * fifth paragraph  (art_5_BGt5eN)
 */
public class ReferenceLabelServiceUnnumberedTest extends ReferenceLabelServiceTest {

    @Test
    public void generateLabel_sameArticle_sourceParagraph2_targetParagraph2() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_FeJW6z", "bill", null)), "bill", "a5_FeJW6z",  document.getContent().get().getSource().getBytes());
        String expectedResults ="this paragraph";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sourceParagraph2_targetParagraph234() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_FeJW6z", "bill", null), new Ref("","art_5_TxunI0", "bill", null), new Ref("","art_5_A42pW6", "bill", null)), "bill", "a5_FeJW6z",  document.getContent().get().getSource().getBytes());
        String expectedResults ="<ref xml:id=\"\" href=\"bill/a5_FeJW6z\">second</ref>"
                + ", <ref xml:id=\"\" href=\"bill/art_5_TxunI0\">third</ref>"
                + " and <ref xml:id=\"\" href=\"bill/art_5_A42pW6\">fourth</ref>"
                + " paragraph";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sourceParagraph2_targetParagraph345() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","art_5_TxunI0", "bill", null), new Ref("","art_5_A42pW6", "bill", null), new Ref("","art_5_BGt5eN", "bill", null)), "bill", "a5_FeJW6z",  document.getContent().get().getSource().getBytes());
        String expectedResults ="<ref xml:id=\"\" href=\"bill/art_5_TxunI0\">third</ref>"
                + ", <ref xml:id=\"\" href=\"bill/art_5_A42pW6\">fourth</ref>"
                + " and <ref xml:id=\"\" href=\"bill/art_5_BGt5eN\">fifth</ref>"
                + " paragraph";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sourcePar1PointA_targetPar1PointA() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_fQYvU7", "bill", null)), "bill", "a5_fQYvU7", document.getContent().get().getSource().getBytes());
        String expectedResults ="this point";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sourcePar1PointDSubPoint_targetPar1DSubPoint() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_T0L37f", "bill", null)), "bill", "a5_T0L37f", document.getContent().get().getSource().getBytes());
        String expectedResults ="this subparagraph";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sourcePar1PointD1_targetPar1PointD1() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_TcYL6X", "bill", null)), "bill", "a5_TcYL6X", document.getContent().get().getSource().getBytes());
        String expectedResults ="this point";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sourcePar1PointD3SubPoint_targetPar1PointD3SubPoint() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_nmQFmM", "bill", null)), "bill", "a5_nmQFmM", document.getContent().get().getSource().getBytes());
        String expectedResults ="this subparagraph";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sourcePar1PointD3I_targetPar1PointD3I() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_HTmAdx", "bill", null)), "bill", "a5_HTmAdx", document.getContent().get().getSource().getBytes());
        String expectedResults ="this point";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sourcePar1PointD3IVSubPoint_targetPar1PointD3IVSubPoint() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_csTSSU", "bill", null)), "bill", "a5_csTSSU", document.getContent().get().getSource().getBytes());
        String expectedResults ="this subparagraph";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sourcePar1PointD3IVIndent_targetPar1PointD3IVIndent() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_A8TAMj", "bill", null)), "bill", "a5_A8TAMj", document.getContent().get().getSource().getBytes());
        String expectedResults ="this indent";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sameParagraph_sourcePointD_target3siblingsABC() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_fQYvU7", "bill", null), new Ref("","a5_lwMbkL", "bill", null), new Ref("","a5_v0SBeN", "bill", null)), "bill", "a5_bSsbTj", document.getContent().get().getSource().getBytes());
        String expectedResults = "point <ref xml:id=\"\" href=\"bill/a5_fQYvU7\">(a)</ref>"
                + ", <ref xml:id=\"\" href=\"bill/a5_lwMbkL\">(b)</ref>"
                + " and <ref xml:id=\"\" href=\"bill/a5_v0SBeN\">(c)</ref>";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sameParagraph_sourcePointA_targetPointD_chose2Points() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_TcYL6X", "bill", null), new Ref("","a5_Vdotsh", "bill", null)), "bill", "a5_fQYvU7", document.getContent().get().getSource().getBytes());
        String expectedResults = "point (d)<ref xml:id=\"\" href=\"bill/a5_TcYL6X\">(1)</ref>"
                + " and <ref xml:id=\"\" href=\"bill/a5_Vdotsh\">(2)</ref>";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sameParagraph_sourcePointA_targetPointD3_chose3Points() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_W9FxgJ", "bill", null), new Ref("","a5_oFgu8x", "bill", null), new Ref("","a5_HTmAdx", "bill", null)), "bill", "a5_fQYvU7",  document.getContent().get().getSource().getBytes());
        String expectedResults = "point (d)(3)<ref xml:id=\"\" href=\"bill/a5_HTmAdx\">(i)</ref>"
                + ", <ref xml:id=\"\" href=\"bill/a5_oFgu8x\">(ii)</ref>"
                + " and <ref xml:id=\"\" href=\"bill/a5_W9FxgJ\">(iii)</ref>";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sameParagraph_sourcePointA_targetPointD3IV_chose3Indent() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_IktngU", "bill", null), new Ref("","a5_51QZD5", "bill", null), new Ref("","a5_A8TAMj", "bill", null)), "bill", "a5_fQYvU7",  document.getContent().get().getSource().getBytes());
        String expectedResults = "point (d)(3)(iv)"
                + ", <ref xml:id=\"\" href=\"bill/a5_A8TAMj\">first</ref>"
                + ", <ref xml:id=\"\" href=\"bill/a5_51QZD5\">second</ref>"
                + " and <ref xml:id=\"\" href=\"bill/a5_IktngU\">third</ref>"
                + " indent";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sameParagraph_sourcePointD2_targetPointD3IV_chose3Indent() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_IktngU", "bill", null), new Ref("","a5_51QZD5", "bill", null), new Ref("","a5_A8TAMj", "bill", null)), "bill", "a5_Vdotsh", document.getContent().get().getSource().getBytes());
        String expectedResults = "point (3)(iv)"
                + ", <ref xml:id=\"\" href=\"bill/a5_A8TAMj\">first</ref>"
                + ", <ref xml:id=\"\" href=\"bill/a5_51QZD5\">second</ref>"
                + " and <ref xml:id=\"\" href=\"bill/a5_IktngU\">third</ref>"
                + " indent";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sameParagraph_sourcePointD3III_targetPointD3IV_chose3Indent() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_IktngU", "bill", null), new Ref("","a5_51QZD5", "bill", null), new Ref("","a5_A8TAMj", "bill", null)), "bill", "a5_W9FxgJ", document.getContent().get().getSource().getBytes());
        String expectedResults = "point (iv)"
                + ", <ref xml:id=\"\" href=\"bill/a5_A8TAMj\">first</ref>"
                + ", <ref xml:id=\"\" href=\"bill/a5_51QZD5\">second</ref>"
                + " and <ref xml:id=\"\" href=\"bill/a5_IktngU\">third</ref>"
                + " indent";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sameParagraph_sourcePointD3IVIndent_targetPointD3VIndent() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_4Lmhzh", "bill", null), new Ref("","a5_nirQOI", "bill", null)), "bill", "a5_A8TAMj", document.getContent().get().getSource().getBytes());
        String expectedResults = "point (v)"
                + ", <ref xml:id=\"\" href=\"bill/a5_nirQOI\">first</ref>"
                + " and <ref xml:id=\"\" href=\"bill/a5_4Lmhzh\">second</ref>"
                + " indent";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sameParagraph_sourcePointD3IVIndent_target2Sibilings() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_51QZD5", "bill", null), new Ref("","a5_IktngU", "bill", null)), "bill", "a5_A8TAMj", document.getContent().get().getSource().getBytes());
        String expectedResults = "<ref xml:id=\"\" href=\"bill/a5_51QZD5\">second</ref>"
                + " and <ref xml:id=\"\" href=\"bill/a5_IktngU\">third</ref>"
                + " indent";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sameParagraph_sourcePointD3IVIndent_targetPointABC() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_fQYvU7", "bill", null), new Ref("","a5_lwMbkL", "bill", null), new Ref("","a5_v0SBeN", "bill", null)), "bill", "a5_A8TAMj", document.getContent().get().getSource().getBytes());
        String expectedResults = "point"
                + " <ref xml:id=\"\" href=\"bill/a5_fQYvU7\">(a)</ref>"
                + ", <ref xml:id=\"\" href=\"bill/a5_lwMbkL\">(b)</ref>"
                + " and <ref xml:id=\"\" href=\"bill/a5_v0SBeN\">(c)</ref>";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sameParagraph_sourcePointD3IVIndent_targetPointD12() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_TcYL6X", "bill", null), new Ref("","a5_Vdotsh", "bill", null)), "bill", "a5_A8TAMj", document.getContent().get().getSource().getBytes());
        String expectedResults = "point"
                + " <ref xml:id=\"\" href=\"bill/a5_TcYL6X\">(1)</ref>"
                + " and <ref xml:id=\"\" href=\"bill/a5_Vdotsh\">(2)</ref>";

        assertEquals(expectedResults, result.get());
    }

    @Test

    public void generateLabel_sameArticle_sameParagraph_sourcePointD3IVIndent_targetPointD3_I_II_III() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_W9FxgJ", "bill", null), new Ref("","a5_oFgu8x", "bill", null), new Ref("","a5_HTmAdx", "bill", null)), "bill", "a5_A8TAMj", document.getContent().get().getSource().getBytes());
        String expectedResults = "point <ref xml:id=\"\" href=\"bill/a5_HTmAdx\">(i)</ref>"
                + ", <ref xml:id=\"\" href=\"bill/a5_oFgu8x\">(ii)</ref>"
                + " and <ref xml:id=\"\" href=\"bill/a5_W9FxgJ\">(iii)</ref>";

        assertEquals(expectedResults, result.get());
    }

    // Alinea tests
    // source indent, test all upper Alineas
    @Test
    public void generateLabel_sameArticle_sameParagraph_sourcePointD3IVIndent_targetPointD3IVSubPoint() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_csTSSU", "bill", null)), "bill", "a5_A8TAMj", document.getContent().get().getSource().getBytes());
        String expectedResults = "<ref xml:id=\"\" href=\"bill/a5_csTSSU\">first</ref>"
                + " subparagraph";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sameParagraph_sourcePointD3IVIndent_targetPointD3IV() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_Pxc9VZ", "bill", null)), "bill", "a5_A8TAMj", document.getContent().get().getSource().getBytes());
        String expectedResults = "this point";

        assertEquals(expectedResults, result.get());
    }

    @Ignore //same behaviour is actually happening. Waiting to discuss with business how to treat sub-points(alinea)
    @Test
    public void generateLabel_sameArticle_sameParagraph_sourcePointD3IVIndent_targetPointD3SubPoint() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_nmQFmM", "bill", null)), "bill", "a5_A8TAMj", document.getContent().get().getSource().getBytes());
        String expectedResults = "point <ref xml:id=\"\" href=\"bill/a5_jlazVX\">(3)</ref>"
                + ", <ref xml:id=\"\" href=\"bill/a5_nmQFmM\">first</ref> subparagraph";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sameParagraph_sourcePointD3IVIndent_targetPointD3() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_jlazVX", "bill", null)), "bill", "a5_A8TAMj", document.getContent().get().getSource().getBytes());
        String expectedResults = "point <ref xml:id=\"\" href=\"bill/a5_jlazVX\">(3)</ref>";

        assertEquals(expectedResults, result.get());
    }

    @Ignore //same behaviour is actually happening. Waiting to discuss with business how to treat sub-points(alinea)
    @Test
    public void generateLabel_sameArticle_sameParagraph_sourcePointD3IVIndent_targetPointDSubPoint() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_T0L37f", "bill", null)), "bill", "a5_A8TAMj", document.getContent().get().getSource().getBytes());
        String expectedResults = "point <ref xml:id=\"\" href=\"bill/a5_bSsbTj\">(d)</ref>"
                + ", <ref xml:id=\"\" href=\"bill/a5_T0L37f\">first</ref> subparagraph";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sameParagraph_sourcePointD3IVIndent_targetPointD() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_bSsbTj", "bill", null)), "bill", "a5_A8TAMj", document.getContent().get().getSource().getBytes());
        String expectedResults = "point <ref xml:id=\"\" href=\"bill/a5_bSsbTj\">(d)</ref>";

        assertEquals(expectedResults, result.get());
    }
    // end source indent, test all upper Alineas

    // source point (a), test all lower Alineas
    @Test
    public void generateLabel_sameArticle_sameParagraph_sourcePointA_targetPointD3IVSubPoint() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_csTSSU", "bill", null)), "bill", "a5_fQYvU7",  document.getContent().get().getSource().getBytes());
        String expectedResults = "point (d)(3)(iv)"
                + ", <ref xml:id=\"\" href=\"bill/a5_csTSSU\">first</ref> subparagraph";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sameParagraph_sourcePointA_targetPointD3IV() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_Pxc9VZ", "bill", null)), "bill", "a5_fQYvU7",  document.getContent().get().getSource().getBytes());
        String expectedResults = "point (d)(3)"
                + "<ref xml:id=\"\" href=\"bill/a5_Pxc9VZ\">(iv)</ref>";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sameParagraph_sourcePointA_targetPointD3SubPoint() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_nmQFmM", "bill", null)), "bill", "a5_fQYvU7",  document.getContent().get().getSource().getBytes());
        String expectedResults = "point (d)(3)"
                + ", <ref xml:id=\"\" href=\"bill/a5_nmQFmM\">first</ref> subparagraph";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sameParagraph_sourcePointA_targetPointD3() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_jlazVX", "bill", null)), "bill", "a5_fQYvU7",  document.getContent().get().getSource().getBytes());
        String expectedResults = "point (d)"
                + "<ref xml:id=\"\" href=\"bill/a5_jlazVX\">(3)</ref>";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sameParagraph_sourcePointA_targetPointDSubPoint() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_T0L37f", "bill", null)), "bill", "a5_fQYvU7",  document.getContent().get().getSource().getBytes());
        String expectedResults = "point (d)"
                + ", <ref xml:id=\"\" href=\"bill/a5_T0L37f\">first</ref> subparagraph";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sameParagraph_sourcePointA_targetPointD() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_bSsbTj", "bill", null)), "bill", "a5_fQYvU7",  document.getContent().get().getSource().getBytes());
        String expectedResults = "point"
                + " <ref xml:id=\"\" href=\"bill/a5_bSsbTj\">(d)</ref>";

        assertEquals(expectedResults, result.get());
    }
    //end aliena

    @Test
    public void generateLabel_sameArticle_sameParagraph_sourcePointA_targetSubParagraph1() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_Bxi62k", "bill", null)), "bill", "a5_fQYvU7",  document.getContent().get().getSource().getBytes());
        String expectedResults ="<ref xml:id=\"\" href=\"bill/a5_Bxi62k\">first</ref>"
                + " subparagraph";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sourceParagraph2_targetParagraph1SubParagraph1() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_Bxi62k", "bill", null)), "bill","a5_FeJW6z", document.getContent().get().getSource().getBytes());
        String expectedResults ="first paragraph"
                + ", <ref xml:id=\"\" href=\"bill/a5_Bxi62k\">first</ref> subparagraph";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_sameArticle_sourceParagraph2_targetParagraph1_chose3Indent() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_A8TAMj", "bill", null), new Ref("","a5_51QZD5", "bill", null), new Ref("","a5_IktngU", "bill", null)), "bill", "a5_FeJW6z", document.getContent().get().getSource().getBytes());
        String expectedResults ="first paragraph"
                + ", point (d)(3)(iv)"
                + ", <ref xml:id=\"\" href=\"bill/a5_A8TAMj\">first</ref>"
                + ", <ref xml:id=\"\" href=\"bill/a5_51QZD5\">second</ref>"
                + " and <ref xml:id=\"\" href=\"bill/a5_IktngU\">third</ref>"
                + " indent";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_differentArticle_targetParagraph234() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_FeJW6z", "bill", null), new Ref("","art_5_TxunI0", "bill", null), new Ref("","art_5_A42pW6", "bill", null)), "bill", "art_1_A42pW6",document.getContent().get().getSource().getBytes());
        String expectedResults ="Article 46"
                + ", <ref xml:id=\"\" href=\"bill/a5_FeJW6z\">second</ref>"
                + ", <ref xml:id=\"\" href=\"bill/art_5_TxunI0\">third</ref>"
                + " and <ref xml:id=\"\" href=\"bill/art_5_A42pW6\">fourth</ref>"
                + " paragraph";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_differentArticle_targetParagraph1PointABC() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_v0SBeN", "bill", null), new Ref("","a5_lwMbkL", "bill", null), new Ref("","a5_fQYvU7", "bill", null)), "bill", "art_1_A42pW6",document.getContent().get().getSource().getBytes());
        String expectedResults ="Article 46"
                + ", first paragraph"
                + ", point <ref xml:id=\"\" href=\"bill/a5_fQYvU7\">(a)</ref>"
                + ", <ref xml:id=\"\" href=\"bill/a5_lwMbkL\">(b)</ref>"
                + " and <ref xml:id=\"\" href=\"bill/a5_v0SBeN\">(c)</ref>";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_differentArticle_targetParagraph1SubParagraph() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_Bxi62k", "bill", null)), "bill", "art_1_A42pW6",document.getContent().get().getSource().getBytes());
        String expectedResults ="Article 46, first paragraph"
                + ", <ref xml:id=\"\" href=\"bill/a5_Bxi62k\">first</ref> subparagraph";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_differentArticle_targetParagraph1PointDSubPoint() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_T0L37f", "bill", null)), "bill", "art_1_A42pW6",document.getContent().get().getSource().getBytes());
        String expectedResults ="Article 46, first paragraph, point (d)"
                + ", <ref xml:id=\"\" href=\"bill/a5_T0L37f\">first</ref>"
                + " subparagraph";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_differentArticle_targetParagraph1_chose3Indent() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_A8TAMj", "bill", null), new Ref("","a5_51QZD5", "bill", null), new Ref("","a5_IktngU", "bill", null)), "bill", "art_1_A42pW6",document.getContent().get().getSource().getBytes());
        String expectedResults ="Article 46"
                + ", first paragraph"
                + ", point (d)(3)(iv)"
                + ", <ref xml:id=\"\" href=\"bill/a5_A8TAMj\">first</ref>"
                + ", <ref xml:id=\"\" href=\"bill/a5_51QZD5\">second</ref>"
                + " and <ref xml:id=\"\" href=\"bill/a5_IktngU\">third</ref>"
                + " indent";

        assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_differentArticle_targetParagraph1_chose2Indent() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_51QZD5", "bill", null), new Ref("","a5_IktngU", "bill", null)), "bill", "", document.getContent().get().getSource().getBytes());
        String expectedResults ="Article 46"
                + ", first paragraph"
                + ", point (d)(3)(iv)"
                + ", <ref xml:id=\"\" href=\"bill/a5_51QZD5\">second</ref>"
                + " and <ref xml:id=\"\" href=\"bill/a5_IktngU\">third</ref>"
                + " indent";
        Assert.assertEquals(expectedResults, result.get());
    }

    @Test
    public void generateLabel_differentArticle_targetParagraph1_chose1Indent() throws Exception {
        Result<String> result = referenceLabelGenerator.generateLabel(Arrays.asList(new Ref("","a5_IktngU", "bill", null)), "bill", "", document.getContent().get().getSource().getBytes());
        String expectedResults ="Article 46"
                + ", first paragraph"
                + ", point (d)(3)(iv)"
                + ", <ref xml:id=\"\" href=\"bill/a5_IktngU\">third</ref>"
                + " indent";
        Assert.assertEquals(expectedResults, result.get());
    }



}
