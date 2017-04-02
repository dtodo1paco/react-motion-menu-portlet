package org.dtodo1paco.react.menu;

import java.io.IOException;

import javax.portlet.PortletException;
import javax.portlet.PortletPreferences;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;

import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.util.StringPool;
import com.liferay.util.bridges.mvc.MVCPortlet;

/**
 * @author dtodo1paco
 *
 */
public class MotionMenuPortlet extends MVCPortlet {
	@Override
	public void doView(RenderRequest request, RenderResponse response) throws PortletException, IOException {
//		PortletPreferences preferences = request.getPreferences();
//		for (String name: preferences.getMap().keySet()) {
//			_log.info("PACO doView: " + name + " => " + preferences.getValue(name, "NADA"));	
//		}
		super.doView(request, response);
	}

	public static void info(String message) {
		if (_log.isInfoEnabled()) {
			_log.info(message);
		}
	}
	
	public static String getValueOrNull(String key, PortletPreferences preferences) {
		String val = preferences.getValue(key,StringPool.BLANK);
		if (val.length() == 0) return null;
		_log.info("getValue for ["+key+"] ["+val+"]");
		return val;
	}
	
	private static final Log _log = LogFactoryUtil
			.getLog(MotionMenuPortlet.class);
}
