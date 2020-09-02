import firebase from "firebase/app";
import "firebase/firestore";
import axios from "axios";

export default {
  actions: {
    addEvent: async ({ commit }, payload) => {
      try {
        commit("loading/btnLoading", true, { root: true });
        commit(
          "alerts/setNotification",
          "Please wait while we send mails to the corresponding providers.",
          { root: true }
        );
        const doc = await firebase
          .firestore()
          .collection("events")
          .add(payload);

        let xmlhttp;
        let template1, template2, template;
        if (window.XMLHttpRequest) {
          xmlhttp = new XMLHttpRequest();
        } else {
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            template = xmlhttp.responseText;
          }
        };

        xmlhttp.open("GET", "/mail/template1.html", false);
        xmlhttp.send();

        let invite = `
          "http://localhost:3000/events/handler?key=${payload.key}&docid=${doc.id}"`;

        template1 = template.replace(
          "accept-invite",
          `<p>
              This is to inform you that the following event would require your help<br><br>
              Name of event: ${payload.name}<br>
              Start Date & Time: ${payload.start}<br>
              End Date & Time: ${payload.end}<br>
              Department: ${payload.dept}<br>
              Details: ${payload.details}<br>
              Venue: ${payload.venue.title}<br>
              Providers: ${
                payload.providers.length === 0
                  ? "None"
                  : payload.providers.map(e => e.title).toString()
              }<br>
            </p><br><br>
          <a class="mcnButton" style="font-weight: bold;letter-spacing: 1px;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF; background: #3F51B5; padding: 20px; border-radius: 100px" href=${invite}>Take Action</a>`
        );

        xmlhttp.open("GET", "/mail/template2.html", false);
        xmlhttp.send();

        template2 = template.replace(
          "accept-invite",
          `<p>
              This is to inform you that the following event would require your help<br><br>
              Name of event: ${payload.name}<br>
              Start Date & Time: ${payload.start}<br>
              End Date & Time: ${payload.end}<br>
              Department: ${payload.dept}<br>
              Details: ${payload.details}<br>
              Venue: ${payload.venue.title}<br>
              Providers: ${
                payload.providers.length === 0
                  ? "None"
                  : payload.providers.map(e => e.title).toString()
              }<br>
            </p>`
        );

        const res = await axios.post(
          "http://localhost:5000/mextifiy-events/us-central1/sendMail",
          {
            venue: payload.venue,
            emails: payload.providers.map(e => e.email).toString(),
            venuehtml: template1,
            providerhtml: template2
          }
        );
        if (res.status !== 200) {
          await firebase
            .firestore()
            .collection("events")
            .doc(doc.id)
            .delete();
          commit(
            "alerts/setError",
            "There was an error sending out mails, please try again later.",
            {
              root: true
            }
          );
        } else
          commit("alerts/setNotification", "Event created successfully!", {
            root: true
          });
        commit("loading/btnLoading", false, { root: true });
      } catch (err) {
        commit("loading/btnLoading", false, { root: true });
        commit("alerts/setError", "An error occured! Please try again later.", {
          root: true
        });
        console.log(err);
      }
    }
  }
};
