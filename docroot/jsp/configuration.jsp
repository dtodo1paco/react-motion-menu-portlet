<%@include file="/jsp/init.jsp" %>
<liferay-portlet:actionURL portletConfiguration="true" var="configurationActionURL" />
<liferay-portlet:renderURL portletConfiguration="true" var="configurationRenderURL" />

<%
	PortletPreferences preferences = renderRequest.getPreferences();
	if (Validator.isNotNull(portletResource)) {
		preferences = PortletPreferencesFactoryUtil.getPortletSetup(request, portletResource);
	}
	String[] configurableFields = new String[]{
		"styleSheet",
		"mainIcon",
		"mainIconDiam",
		"bgColor",
		"color",
		"childIconDiam"
	};
	Map<String, String> currentValues = new HashMap<String,String>();
%>
<aui:form action="<%=configurationActionURL%>" method="post" name="fm">
	<aui:input name="<%= Constants.CMD %>" type="hidden" value="<%= Constants.UPDATE %>" />
	<aui:input name="redirect" type="hidden" value="<%= configurationRenderURL %>" />

	<liferay-ui:error exception="<%= Exception.class %>" message="label.motion-menu.error-please-enter-valid-values" />
	
	<liferay-ui:panel-container extended="<%= Boolean.TRUE %>" id="motionMenuPortletConfiguration" persistState="<%= true %>">
		<liferay-ui:panel collapsible="<%= true %>" extended="<%= true %>" id="motionMenuPortletGeneral" persistState="<%= true %>" 
			title="label.motion-menu.configuration">
			<aui:fieldset>
				<liferay-ui:message key="label.motion-menu.help-field-configuration-values" />
<%
				for (String configurableField: configurableFields) {
					String lbl = "label.motion-menu." + configurableField;
					String keyName = "preferences--key-" + configurableField + "--";
					String value = GetterUtil.getString(portletPreferences
							.getValue("key-"+configurableField, StringPool.BLANK));
%>
					<aui:input 
						label="<%=lbl %>" 
						name="<%=keyName %>" 
						wrapperCssClass="lfr-input-text-container" 
						value="<%=value %>" />
<%
				}
%>
			</aui:fieldset>
			<aui:fieldset label="label.motion-menu.childIcons">
				<div id="childIcon-fields">
<%
					int childButtons = 6;
					for (int i=1;i<childButtons;i++) {
						String field1Name = "preferences--key-childIconCssClassName" + i + "--";
						String value1 = preferences.getValue("key-childIconCssClassName" + i, "");
						String field2Name = "preferences--key-childIconUrl" + i + "--";
						String value2 = preferences.getValue("key-childIconUrl" + i, "");
%>
						<div class="lfr-form-row lfr-form-row-inline">
							<div class="row-fields" style="display: flex;">
								<aui:input fieldParam="<%=field1Name %>" 
									id="<%=field1Name %>" 
									name="<%=field1Name %>" 
									label="label.motion-menu.icon-css-classname" 
									value="<%=value1 %>" />
								<aui:input fieldParam="<%=field2Name %>" 
									id="<%=field2Name %>" 
									name="<%=field2Name %>" 
									label="label.motion-menu.icon-url" 
									value="<%=value2 %>"/>
							</div>
						</div>

<%
					}
%>
				</div>
			</aui:fieldset>
		</liferay-ui:panel>
	</liferay-ui:panel-container>

	<aui:button-row>
		<aui:button type="submit" />
	</aui:button-row>
</aui:form>
