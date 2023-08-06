<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230806121127 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE company_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE contact_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE disruption_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE media_object_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE refresh_tokens_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE typology_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE company (id INT NOT NULL, name VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_4FBF094F5E237E06 ON company (name)');
        $this->addSql('CREATE TABLE contact (id INT NOT NULL, company_id INT NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(255) DEFAULT NULL, zip_code VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_4C62E638979B1AD6 ON contact (company_id)');
        $this->addSql('CREATE TABLE disruption (id INT NOT NULL, author_id INT NOT NULL, typology_id INT NOT NULL, category_id INT NOT NULL, sub_category_id INT DEFAULT NULL, transport_type VARCHAR(255) NOT NULL, content TEXT NOT NULL, lat VARCHAR(255) NOT NULL, long VARCHAR(255) NOT NULL, priority VARCHAR(255) NOT NULL, evidences_path VARCHAR(255) DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_DB672C1CF675F31B ON disruption (author_id)');
        $this->addSql('CREATE INDEX IDX_DB672C1CC7D98C7A ON disruption (typology_id)');
        $this->addSql('CREATE INDEX IDX_DB672C1C12469DE2 ON disruption (category_id)');
        $this->addSql('CREATE INDEX IDX_DB672C1CF7BFE87C ON disruption (sub_category_id)');
        $this->addSql('CREATE TABLE media_object (id INT NOT NULL, file_path VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE refresh_tokens (id INT NOT NULL, refresh_token VARCHAR(128) NOT NULL, username VARCHAR(255) NOT NULL, valid TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_9BACE7E1C74F2195 ON refresh_tokens (refresh_token)');
        $this->addSql('CREATE TABLE typology (id INT NOT NULL, icon_id INT NOT NULL, label VARCHAR(255) NOT NULL, color VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_1596C8F854B9D732 ON typology (icon_id)');
        $this->addSql('CREATE TABLE typology_parent (typology_id INT NOT NULL, parent_id INT NOT NULL, PRIMARY KEY(typology_id, parent_id))');
        $this->addSql('CREATE INDEX IDX_57161AB6C7D98C7A ON typology_parent (typology_id)');
        $this->addSql('CREATE INDEX IDX_57161AB6727ACA70 ON typology_parent (parent_id)');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, phone VARCHAR(255) DEFAULT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
        $this->addSql('ALTER TABLE contact ADD CONSTRAINT FK_4C62E638979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE disruption ADD CONSTRAINT FK_DB672C1CF675F31B FOREIGN KEY (author_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE disruption ADD CONSTRAINT FK_DB672C1CC7D98C7A FOREIGN KEY (typology_id) REFERENCES typology (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE disruption ADD CONSTRAINT FK_DB672C1C12469DE2 FOREIGN KEY (category_id) REFERENCES typology (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE disruption ADD CONSTRAINT FK_DB672C1CF7BFE87C FOREIGN KEY (sub_category_id) REFERENCES typology (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE typology ADD CONSTRAINT FK_1596C8F854B9D732 FOREIGN KEY (icon_id) REFERENCES media_object (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE typology_parent ADD CONSTRAINT FK_57161AB6C7D98C7A FOREIGN KEY (typology_id) REFERENCES typology (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE typology_parent ADD CONSTRAINT FK_57161AB6727ACA70 FOREIGN KEY (parent_id) REFERENCES typology (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE company_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE contact_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE disruption_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE media_object_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE refresh_tokens_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE typology_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('ALTER TABLE contact DROP CONSTRAINT FK_4C62E638979B1AD6');
        $this->addSql('ALTER TABLE disruption DROP CONSTRAINT FK_DB672C1CF675F31B');
        $this->addSql('ALTER TABLE disruption DROP CONSTRAINT FK_DB672C1CC7D98C7A');
        $this->addSql('ALTER TABLE disruption DROP CONSTRAINT FK_DB672C1C12469DE2');
        $this->addSql('ALTER TABLE disruption DROP CONSTRAINT FK_DB672C1CF7BFE87C');
        $this->addSql('ALTER TABLE typology DROP CONSTRAINT FK_1596C8F854B9D732');
        $this->addSql('ALTER TABLE typology_parent DROP CONSTRAINT FK_57161AB6C7D98C7A');
        $this->addSql('ALTER TABLE typology_parent DROP CONSTRAINT FK_57161AB6727ACA70');
        $this->addSql('DROP TABLE company');
        $this->addSql('DROP TABLE contact');
        $this->addSql('DROP TABLE disruption');
        $this->addSql('DROP TABLE media_object');
        $this->addSql('DROP TABLE refresh_tokens');
        $this->addSql('DROP TABLE typology');
        $this->addSql('DROP TABLE typology_parent');
        $this->addSql('DROP TABLE "user"');
    }
}
