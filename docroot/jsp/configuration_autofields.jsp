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

	<liferay-ui:error exception="<%= Exception.class %>" message="please-enter-valid-values" />
	
	<liferay-ui:panel-container extended="<%= Boolean.TRUE %>" id="motionMenuPortletConfiguration" persistState="<%= true %>">
		<liferay-ui:panel collapsible="<%= true %>" extended="<%= true %>" id="motionMenuPortletGeneral" persistState="<%= true %>" title="motionMenuPortlet-configuration">
			<aui:fieldset>
				<liferay-ui:message key="help-field-configuration-values" />
<%
				for (String configurableField: configurableFields) {
					String lbl = "label." + configurableField;
					String keyName = "preferences--key-" + configurableField + "--";
					String keyValue = GetterUtil.getString(portletPreferences
							.getValue(keyName, StringPool.BLANK));
%>
					<aui:input 
						label="<%=lbl %>" 
						name="<%=keyName %>" value="<%=keyValue  %>" wrapperCssClass="lfr-input-text-container" />
<%
				}
%>
			</aui:fieldset>
			<aui:fieldset>
				<div id="childIcon-fields">
					<div class="lfr-form-row lfr-form-row-inline">
						<div class="row-fields" style="display: flex;">
<%
							int childButtons = 0;
//							for (String preferenceName: preferences.getMap().keySet()) {
%>
<%
//							}
							int num = childButtons + 1;
							String field1Name = "preferences--childIconCssClassName" + num;
							String field2Name = "preferences--childIconUrl" + num + "--";
							// There is a problem here. Preference params must end with -- but AutoFields ends in number
%>
							<aui:input fieldParam="<%=field1Name %>" 
								id="<%=field1Name %>" 
								name="<%=field1Name %>" 
								label="Child Icon Css ClassName" />
							<aui:input fieldParam="<%=field2Name %>" 
								id="<%=field2Name %>" 
								name="<%=field2Name %>" 
								label="Child Icon Url" />
						</div>
					</div>
				</div>
			</aui:fieldset>
		</liferay-ui:panel>
	</liferay-ui:panel-container>

	<aui:button-row>
		<aui:button type="submit" />
	</aui:button-row>
</aui:form>



<aui:script>
AUI().use('liferay-auto-fields',function(A) {
	new Liferay.AutoFields({
			contentBox: '#childIcon-fields',
			fieldIndexes: '<portlet:namespace />rowIndexes'
		}).render();
	});
</aui:script>