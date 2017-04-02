<%@include file="/jsp/init.jsp" %>
<%@page import="org.dtodo1paco.react.menu.MotionMenuPortlet"%>

<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<portlet:defineObjects />
<%
PortletPreferences preferences = renderRequest.getPreferences();
MotionMenuPortlet.info("view.jsp: preferences: " + preferences);
//for (String name: preferences.getMap().keySet()) {
//	MotionMenuPortlet.info("view.jsp: " + name + " => " + preferences.getValue(name, "NADA"));
//}
String styleSheet = GetterUtil.getString(MotionMenuPortlet.getValueOrNull("key-styleSheet",preferences),
	"https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css");
//https://fonts.googleapis.com/icon?family=Material+IconsString mainIcon = portletPreferences.getValue("key-mainIcon","fa-question-circle-o 3x");
String mainIcon = GetterUtil.getString(MotionMenuPortlet.getValueOrNull("key-mainIcon",preferences),
	"fa fa-question-circle-o 2x");
String mainIconDiam = GetterUtil.getString(MotionMenuPortlet.getValueOrNull("key-mainIconDiam",preferences),
	"100");
String bgColor = GetterUtil.getString(MotionMenuPortlet.getValueOrNull("key-bgColor",preferences),
	"#000000");
String color = GetterUtil.getString(MotionMenuPortlet.getValueOrNull("key-color",preferences),
	"#FFFFFF");
String childIconDiam = GetterUtil.getString(MotionMenuPortlet.getValueOrNull("key-childIconDiam",preferences),
	"45");
Map<String,String> childIcons = new HashMap<String,String>();
for (int i=1;i<6;i++) {
	String key = "key-childIconCssClassName"+i;
	key = GetterUtil.getString(MotionMenuPortlet.getValueOrNull(key,preferences));
	if (Validator.isNotNull(key)) {
		String val = portletPreferences.getValue("key-childIconUrl"+i, "/");
		childIcons.put(key, val);
	}
}
%>

<link rel="stylesheet" href="<%=styleSheet%>">
<div id="container"></div>
<script>
var childIconProps = {};
childIconProps.icons = [];
childIconProps.links = [];
<%
	for (String key:childIcons.keySet()) {
		String link = childIcons.get(key);
%>
		childIconProps.icons.push('<%=key%>');
		childIconProps.links.push('<%=link%>');
<%
	}
%>
childIconProps.diam = <%=childIconDiam%>;

var mainIconProps = {};
mainIconProps.icon = '<%=mainIcon%>';
mainIconProps.diam = <%=mainIconDiam%>;
var pos = getCenterPosition(mainIconProps.diam,mainIconProps.diam)
mainIconProps.pos_x = pos.left;
mainIconProps.pos_y = pos.top;

var background_color = '<%=bgColor%>';
var color = '<%=color%>';

renderMotionMenu('#container', mainIconProps, childIconProps, color, background_color);
</script>

