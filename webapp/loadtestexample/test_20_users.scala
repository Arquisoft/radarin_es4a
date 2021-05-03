
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class test_20_users extends Simulation {

	val httpProtocol = http
		.baseUrl("https://radarines4awebapp.herokuapp.com")
		.inferHtmlResources(BlackList(""".*\.js""", """.*\.css""", """.*\.gif""", """.*\.jpeg""", """.*\.jpg""", """.*\.ico""", """.*\.woff""", """.*\.woff2""", """.*\.(t|o)tf""", """.*\.png""", """.*detectportal\.firefox\.com.*"""), WhiteList())
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.9,en;q=0.8")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36")

	val headers_0 = Map(
		"Accept-Encoding" -> "gzip, deflate",
		"Cache-Control" -> "no-cache",
		"Pragma" -> "no-cache",
		"Proxy-Connection" -> "keep-alive")

	val headers_1 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
		"Cache-Control" -> "max-age=0",
		"Sec-Fetch-Dest" -> "document",
		"Sec-Fetch-Mode" -> "navigate",
		"Sec-Fetch-Site" -> "same-origin",
		"Sec-Fetch-User" -> "?1",
		"Upgrade-Insecure-Requests" -> "1",
		"sec-ch-ua" -> """" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"""",
		"sec-ch-ua-mobile" -> "?0")

	val headers_2 = Map(
		"Accept" -> "*/*",
		"If-None-Match" -> """"7da00d0d7f24a84bb31887dce9873eed31f4a419"""",
		"Sec-Fetch-Dest" -> "empty",
		"Sec-Fetch-Mode" -> "cors",
		"Sec-Fetch-Site" -> "same-origin",
		"X-Requested-With" -> "XMLHttpRequest",
		"sec-ch-ua" -> """" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"""",
		"sec-ch-ua-mobile" -> "?0")

	val headers_3 = Map(
		"Accept" -> "*/*",
		"If-None-Match" -> """"08d504534081d611a2ff0f92ad4347696078df67"""",
		"Sec-Fetch-Dest" -> "empty",
		"Sec-Fetch-Mode" -> "cors",
		"Sec-Fetch-Site" -> "same-origin",
		"X-Requested-With" -> "XMLHttpRequest",
		"sec-ch-ua" -> """" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"""",
		"sec-ch-ua-mobile" -> "?0")

	val headers_5 = Map(
		"Accept" -> "*/*",
		"If-None-Match" -> """"1a6005f30d7d33c4e3b5aec54c906faa65a19fbd"""",
		"Sec-Fetch-Dest" -> "empty",
		"Sec-Fetch-Mode" -> "cors",
		"Sec-Fetch-Site" -> "same-origin",
		"X-Requested-With" -> "XMLHttpRequest",
		"sec-ch-ua" -> """" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"""",
		"sec-ch-ua-mobile" -> "?0")

	val headers_6 = Map(
		"Accept" -> "*/*",
		"Sec-Fetch-Dest" -> "empty",
		"Sec-Fetch-Mode" -> "cors",
		"Sec-Fetch-Site" -> "same-origin",
		"X-Requested-With" -> "XMLHttpRequest",
		"sec-ch-ua" -> """" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"""",
		"sec-ch-ua-mobile" -> "?0")

	val headers_8 = Map(
		"Accept" -> "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
		"If-None-Match" -> """"171f305c084f94a42c3ae77d101c11a40e12b726"""",
		"Sec-Fetch-Dest" -> "image",
		"Sec-Fetch-Mode" -> "no-cors",
		"Sec-Fetch-Site" -> "same-origin",
		"sec-ch-ua" -> """" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"""",
		"sec-ch-ua-mobile" -> "?0")

	val headers_9 = Map(
		"Accept" -> "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
		"If-None-Match" -> """"a0b0d211d98eeef20a89b49a2e5e847a91fa345c"""",
		"Sec-Fetch-Dest" -> "image",
		"Sec-Fetch-Mode" -> "no-cors",
		"Sec-Fetch-Site" -> "same-origin",
		"sec-ch-ua" -> """" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"""",
		"sec-ch-ua-mobile" -> "?0")

	val headers_10 = Map(
		"Accept" -> "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
		"If-None-Match" -> """"abf9998a9de849210c83d11d77b36c3cb1bd589a"""",
		"Sec-Fetch-Dest" -> "image",
		"Sec-Fetch-Mode" -> "no-cors",
		"Sec-Fetch-Site" -> "same-origin",
		"sec-ch-ua" -> """" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"""",
		"sec-ch-ua-mobile" -> "?0")

	val headers_11 = Map(
		"Accept" -> "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
		"Sec-Fetch-Dest" -> "image",
		"Sec-Fetch-Mode" -> "no-cors",
		"Sec-Fetch-Site" -> "same-origin",
		"sec-ch-ua" -> """" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"""",
		"sec-ch-ua-mobile" -> "?0")

	val headers_12 = Map(
		"Accept" -> "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
		"If-None-Match" -> """"486e7d63a18651b3fa2999b7475a25b22a71cd3a"""",
		"Sec-Fetch-Dest" -> "image",
		"Sec-Fetch-Mode" -> "no-cors",
		"Sec-Fetch-Site" -> "same-origin",
		"sec-ch-ua" -> """" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"""",
		"sec-ch-ua-mobile" -> "?0")

    val uri2 = "http://www.gstatic.com/generate_204"

	val scn = scenario("test_135_users")
		.exec(addCookie(Cookie("nssidp.sid", "s:3YRsLz6at2-2LAoBojPSHfhobKUJzAVv.4Ydo2RQzdWTpzGPxiH42PtO4JS7w5zPsZQ+UFaRd+Qo")))
		.exec(http("request_0")
			.get(uri2)
			.headers(headers_0))
		.pause(9)
		.exec(http("request_1")
			.get("/welcome")
			.headers(headers_1))
		.pause(1)
		.exec(http("request_2")
			.get("/locales/es/translation.json")
			.headers(headers_2)
			.resources(http("request_3")
			.get("/locales/en-US/translation.json")
			.headers(headers_3)))
		.pause(3)
		.exec(http("request_4")
			.get("/welcome")
			.headers(headers_1)
			.resources(http("request_5")
			.get("/locales/en/translation.json")
			.headers(headers_5),
            http("request_6")
			.get("/locales/en-US/translation.json")
			.headers(headers_6),
            http("request_7")
			.get("/locales/es/translation.json")
			.headers(headers_6),
            http("request_8")
			.get("/img/icon/notification.svg")
			.headers(headers_8),
            http("request_9")
			.get("/img/icon/empty-profile.svg")
			.headers(headers_9),
            http("request_10")
			.get("/img/bars-nav.svg")
			.headers(headers_10)))
		.pause(1)
		.exec(http("request_11")
			.get("/img/icon/notification.svg")
			.headers(headers_11)
			.resources(http("request_12")
			.get("/static/media/es.50623e6a.svg")
			.headers(headers_12),
            http("request_13")
			.get("/img/icon/empty-profile.svg")
			.headers(headers_11)))
		.pause(1)
		.exec(http("request_14")
			.get("/img/bars-nav.svg")
			.headers(headers_11))
		.pause(6)
		.exec(http("request_15")
			.get("/img/bars-nav.svg")
			.headers(headers_11))
		.pause(5)
		.exec(http("request_16")
			.get("/img/bars-nav.svg")
			.headers(headers_11))
		.pause(8)
		.exec(http("request_17")
			.get("/img/bars-nav.svg")
			.headers(headers_11))

	setUp(scn.inject(constantUsersPerSec(2) during (10 seconds) randomized).protocols(httpProtocol))
}