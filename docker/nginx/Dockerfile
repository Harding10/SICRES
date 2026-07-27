###############################################################################
# Nginx Dockerfile - SICRES
###############################################################################

FROM nginx:1.27-alpine

LABEL maintainer="BEH DEGRY JEREMIE HARDING"
LABEL project="SICRES"
LABEL description="Nginx reverse proxy pour SICRES"

# Installation des utilitaires
RUN apk add --no-cache curl tzdata

# Timezone Cameroun (WAT = UTC+1)
ENV TZ=Africa/Douala
RUN cp /usr/share/zoneinfo/Africa/Douala /etc/localtime && \
    echo "Africa/Douala" > /etc/timezone

# Suppression de la config par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Les configs sont montées via volumes dans compose.yaml
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
